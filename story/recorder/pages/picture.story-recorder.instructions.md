You make one picture of one played turn or written chapter, once its prose is written, and draft it onto that page as its cover. A written chapter is pictured as a turn is: read chapter wherever these instructions say turn, so each chapter gets one cover.

The story is the page beside the folder holding the turn. Its design is the story-design page of the same slug in the `designs` folder of the story's world. Where the design states no `visualStyle`, record nothing and advance.

Read the turn's prose, the page of each character the turn names, and the image page each character's `cover` names. For each character, read the lore page in the world's `lore` folder whose `about` names that character: it says how that character looks and what that character wears now. Read the cover of the turn before, where it has one. Its prompt is the last picture of this story.

Pick the one moment of the turn's prose that shows most, often where the turn ends, and the one subject in it that shows most: one figure, one creature, one thing or one place. The picture is of that subject alone. Any other figure is left out of frame, since a picture holding two subjects renders neither well.

Dress a figure in everything the lore says she still wears, down to what is under what, unless the prose shows it off, changed or torn. Where the lore and the prose differ, the prose wins, since the lore says what is true now rather than at this turn. Show only what the prose shows the player. A system window in the picture is a glowing glyph, never a spelled word, and nothing in the picture is lettered. Keep what this turn shares with the turn before as the last prompt put it. Leave double quotes, backticks and dollar signs out of the prompt.

**A subject with a cover** is drawn by editing that cover, so the face and body stay the cover's. The cover's picture is the file beside its image page named `<cover slug>.image.bytes.uncommitted.png`. Write an edit prompt of 150 to 250 words, one paragraph of plain description:

- opening by keeping the cover's subject exact, as `Keep this exact woman: same face, freckles, eyes, lips, skin and hair.` does for a woman, then `Change the scene around her.` and the design's visual style
- where the subject is a character, that character's `coverDescription` word for word, since a face said only as kept drifts. Where the character states none, write the face and hair as the cover's picture shows them, feature by feature, as `pale fair skin, a light dusting of freckles across her nose and cheeks, blue-grey eyes, straight dark auburn brows, a heart-shaped face, long straight dark auburn-red hair worn loose with a side part` does
- what the subject wears, piece by piece, as above
- the pose, expression and where the subject looks, stated plainly and exactly, since an edit drifts from a pose said loosely
- the place behind the subject, the light and the time of day
- the camera: framing, lens and depth of field, close enough that the subject fills the frame

Edit it, alone on its line:

`akasha inference edit --engine qwen --image infrastructure/inference/generation/image/pages/<cover slug>.image.bytes.uncommitted.png --output /var/tmp/akasha-turn-pictures/<turn slug>.png --prompt "<the prompt>"`

**A subject with no cover** is rendered from words. Write a prompt of 200 to 300 words, one paragraph of plain description, opening with the design's visual style, then the subject and what it is doing, the place, the light and time of day, and the camera. Render it at the design's `imageSeed`, alone on its line:

`akasha inference zimage --model beyond-reality-3 --seed <imageSeed> --steps 8 --guidance 1.0 --width 1216 --height 832 --output /var/tmp/akasha-turn-pictures/<turn slug>.png --prompt "<the prompt>"`

The edit or the render lands the image page itself and names it: `landed the image page image-…` or `the image page image-… was already there`. Where it is refused because nothing answers, run `akasha inference zimage-up` alone on its line and run it once more. Where that is refused too, record nothing and advance.

Draft `cover: "image/<that image slug>"` onto the turn page with `akasha change apply --draft`, and land nothing yourself. The advance moving the turn to its player lands your edit.

Do not rewrite the prose or the beats, and do not judge style, pacing or taste.
