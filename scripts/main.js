(function () {

    'use strict';

    $(document).ready(appReady);

    function appReady() {
        console.log('I\'m ready');

        var ctx;
        var template;
        var container = $('.meme-generator');
        var form = container.find('form');
        var topText = container.find('[name=top_text]');
        var bottomText = container.find('[name=bottom_text]');
        var topTextSize = container.find('[name=top_text_size]');
        var bottomTextSize = container.find('[name=bottom_text_size]');
        var canvas = container.find('#preview_canvas').get(0);
        var memeList = container.find('.list-memes');

        initFn();

        form.on('submit', generateMeme);
        topText.on('keyup', startCanvas);
        bottomText.on('keyup', startCanvas);
        topTextSize.on('change', startCanvas);
        bottomTextSize.on('change', startCanvas);
        memeList.on('click', 'span', selectMeme);

        function initFn() {
            ctx = canvas.getContext('2d');
            canvas.width = canvas.height = 0;

            startCanvas();
        }

        function selectMeme() {
            var target = $(this);
            var name = target.data('name');

            console.log(name);

            template = name + '_meme.jpg';

            startCanvas();
        }

        function startCanvas() {
            if (!template) { return; }

            var img = new Image;
            var fontSize, imgWidth, imgHeight;
            var topTextValue = topText.val();
            var bottomTextValue = bottomText.val();
            var topTextSizeValue = topTextSize.val();
            var bottomTextSizeValue = bottomTextSize.val();

            img.src = 'images/' + template;

            img.onload = function () {
                imgWidth = img.width;
                imgHeight = img.height;

                canvas.width = imgWidth;
                canvas.height = imgHeight;

                ctx.clearRect(0, 0, imgWidth, imgHeight);
                ctx.drawImage(img, 0, 0);

                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.textAlign = 'center';

                fontSize = imgWidth * topTextSizeValue;

                ctx.font = fontSize + 'px Impact';
                ctx.lineWidth = fontSize / 20;
                ctx.textBaseline = 'top';
                ctx.fillText(topTextValue, imgWidth / 2, 0, imgWidth);
                ctx.strokeText(topTextValue, imgWidth / 2, 0, imgWidth);

                fontSize = imgWidth * bottomTextSizeValue;

                ctx.font = fontSize + 'px Impact';
                ctx.lineWidth = fontSize / 20;
                ctx.textBaseline = 'bottom';
                ctx.fillText(bottomTextValue, imgWidth / 2, imgHeight, imgWidth);
                ctx.strokeText(bottomTextValue, imgWidth / 2, imgHeight, imgWidth);
            };
        }

        function generateMeme() {
            var link = document.createElement('a');
            var img = canvas.toDataURL("image/png");

            link.download = 'meme_generated.png';
            link.href = img;

            link.click();
        }
    }

}());