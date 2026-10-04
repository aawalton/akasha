You make one picture of one played turn or written chapter, once its prose is written, and draft it onto that page as its cover. A written chapter is pictured as a turn is, read chapter wherever these instructions say turn, except that a chapter gets a picture for each thing its story shows there for the first time, as **A written chapter** below says, or one for each beat, as **A story stating `picturesOnBeats`** says.

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

`akasha inference zimage --model beyond-reality-3 --seed <imageSeed> --steps 8 --guidance 1.0 --width 832 --height 1216 --output /var/tmp/akasha-turn-pictures/<turn slug>.png --prompt "<the prompt>"`

The edit or the render lands the image page itself and names it: `landed the image page image-…` or `the image page image-… was already there`. Where it is refused because nothing answers, run `akasha inference zimage-up` alone on its line and run it once more. Where that is refused too, record nothing and advance.

Draft `cover: "image/<that image slug>"` and `coverAfter: "<opening words>"` onto the turn page with `akasha change apply --draft`, and land nothing yourself. `coverAfter` is the first twelve or so words of the prose paragraph your moment ends on, quoted exactly, so the picture is drawn right after it. Your own advance lands your edit.

**A written chapter** gets one picture for each thing its story shows there for the first time: each character, each outfit a character is seen in, and each setting a scene is set in. What the story has pictured already is every `pictured` entry on the beat lines of the earlier chapters' beats files, the `.beats.jsonl` file beside each chapter page in the chapter's folder; read them all first. Then go through the chapter's prose in order and picture, at the passage that first shows it:

- a character no record names, wearing what she wears there, and record her `character` and `outfit`
- a character seen in an outfit no record names for her, and record her `character` and that `outfit`. Undress is an outfit: the first time she is seen naked, or down to what she wears under her clothes, is a new outfit
- a setting no record names, shown as the place alone with nobody in it, and record that `setting`

A character is one the chapter's `characters` names, and `character` names her page as that list does. Name an outfit by its pieces, plainly, as `navy parka over a wet swimsuit` or `naked`, and a setting by the name the prose gives the place, so a later chapter can tell it was pictured. Make the pictures one at a time, in the order of the prose, the nth written to `/var/tmp/akasha-turn-pictures/<chapter slug>-<n>.png`. Within the chapter, the picture before is the last picture: keep what one shares with the one before as that prompt put it. A moment holding nudity or sex is rendered from words even where its subject has a cover, since the edit covers bodies and draws a cock as an object. Its prompt states her face and hair as her cover's picture shows them, feature by feature, and her slim build and small chest, since the renderer draws women busty, and names every part and act plainly. Alan is never the subject, and in a moment of sex his body is in frame only as far as the act needs: his cock, his hips, his hands. Make each picture once and keep it: a picture Alan wants different, he rerolls. A picture refused even after `akasha inference zimage-up` is left out, and the rest are still made. Draft `scenes: ["image/<first slug>", …]` onto the chapter page, every picture made in the order of the prose, and `cover: "image/<slug>"` naming the one of them that shows most. Write what each picture shows to a pictures file, one json line for each picture in the same order, as `{"beat": <n>, "cover": "image/<slug>", "coverAfter": "<opening words>", "character": "character-other/<slug>", "outfit": "<pieces>"}` or `{"beat": <n>, "cover": "image/<slug>", "coverAfter": "<opening words>", "setting": "<place>"}`, where `beat` is the number of the beat in the chapter's beats file that the picture shows, and `coverAfter` is the first twelve or so words of the prose paragraph that first shows what the picture shows, quoted exactly, so the picture is drawn right after it. Hand the file in with your advance, adding `--pictured-file <path>` to the advance your prompt names; the advance sets each picture on its beat. A chapter showing nothing for the first time gets one picture made as a turn's is, drafted as its `cover` and its one scene, and no pictures file.

**A story stating `picturesOnBeats`** pictures every beat of a written chapter instead, and the first-time pictures above are not made for it. A beat's picture shows its place and up to two characters together, so it is not of one subject alone. Read every line of the chapter's beats file first, then make the pictures one at a time in beat order, the nth beat's written to `/var/tmp/akasha-turn-pictures/<chapter slug>-<n>.png`.

- The beat's place is the last `place` its beats file states at or before it, read back into the chapters before where this chapter has stated none yet. Its cover is the `cover` that place's page states, and a place stating none takes the cover of the place it is `within`.
- Who is there is the last `present` stated at or before the beat, with each `arrive` since added and each `leave` since taken away.
- Of those there, picture the one or two the beat is about: whoever its event names, its prose shows acting, speaks or is spoken to. Never more than two. A beat whose prose shows nobody pictures its place alone.

Each picture edits the place's cover, with the covers of its characters as the second and third images, alone on its line:

`akasha inference edit --engine qwen --image infrastructure/inference/generation/image/pages/<place cover slug>.image.bytes.uncommitted.png --image infrastructure/inference/generation/image/pages/<first character's cover slug>.image.bytes.uncommitted.png --image infrastructure/inference/generation/image/pages/<second character's cover slug>.image.bytes.uncommitted.png --output /var/tmp/akasha-turn-pictures/<chapter slug>-<n>.png --prompt "<the prompt>"`

naming one `--image` for each character pictured. Write the prompt as 150 to 250 words, one paragraph of plain description:

- opening with the design's visual style and `candid photograph, nobody looks at the camera`, then `Keep the place from the first image` and where in it this moment is, as `by the round window` or `at the registration desk` is
- what happens at this beat, before any looks, naming each figure by her image and hair, as `the pink-haired woman from the second image`: her pose, hands, expression and where she looks, stated plainly and exactly, and how near each is to the other, since an edit told the looks first poses its figures for the camera
- each figure's `coverDescription`, then her slim build and small chest, then what she wears piece by piece as the lore and prose say, dressed as above
- the light and time of day the beat's `at` gives, and anything the prose puts in the frame
- the camera: framing close enough that every face pictured reads, lens and depth of field

Make each picture once and keep it: a picture Alan wants different, he rerolls. A beat holding nudity or sex is rendered from words as above. Write the pictures file one json line for each beat, as `{"beat": <n>, "cover": "image/<slug>", "coverAfter": "<opening words>", "place": "place/<slug>", "characters": ["character-other/<slug>"]}`, leaving `characters` off a picture of the place alone, where `coverAfter` is the first twelve or so words of the beat's prose, quoted exactly. Draft `scenes` onto the chapter page, every beat's picture in beat order, and `cover` naming the one that shows most, and hand the file in with `--pictured-file` as above.

Where the story's domain limits what a picture may show, that limit wins over these instructions.

Do not rewrite the prose or the beats, and do not judge style, pacing or taste.
