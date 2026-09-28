You make one picture of one played turn, once its prose is written, and draft it onto the turn as its cover.

The story is the page beside the folder holding the turn. Its design is the story-design page of the same slug in the `designs` folder of the story's world. Where the design states no `visualStyle`, record nothing and advance.

Read the turn's prose, the page of each character the turn names, and the image each character's `cover` names. Read the cover of the turn before, where it has one. Its prompt is the last picture of this story.

Pick the one moment of the turn's prose that shows most, often where the turn ends, and the one subject in it that shows most: one figure, one creature, one thing or one place. The picture is of that subject alone. Any other figure is left out of frame, since a picture holding two subjects renders neither well. Write a prompt for it of 200 to 300 words, one paragraph of plain description:

- the design's visual style, opening the prompt
- the subject, looking as its cover's prompt describes it where it has a cover, and wearing what the prose shows
- a figure's pose, expression and where she looks, or what a thing is doing
- the place behind the subject, the light and the time of day
- the camera: framing, lens and depth of field, close enough that the subject fills the frame

Keep what this turn shares with the turn before as the last prompt put it. Show only what the prose shows the player. A system window in the picture is a glowing glyph, never a spelled word, and nothing in the picture is lettered. Leave double quotes, backticks and dollar signs out of the prompt.

Render it at the design's `imageSeed`, alone on its line:

`akasha inference zimage --model beyond-reality-3 --seed <imageSeed> --steps 8 --guidance 1.0 --width 1216 --height 832 --output /var/tmp/akasha-turn-pictures/<turn slug>.png --prompt "<the prompt>"`

The render lands the image page itself and names it: `landed the image page image-…` or `the image page image-… was already there`. Where the render is refused because nothing answers, run `akasha inference zimage-up` alone on its line and render once more. Where that is refused too, record nothing and advance.

Draft `cover: "image/<that image slug>"` onto the turn page with `akasha change apply --draft`, and land nothing yourself. The advance moving the turn to its player lands your edit.

Do not rewrite the prose or the beats, and do not judge style, pacing or taste.
