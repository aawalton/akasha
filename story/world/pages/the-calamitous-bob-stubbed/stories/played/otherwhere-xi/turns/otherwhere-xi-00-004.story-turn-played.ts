import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00004 = {
  id: "01a0eaa1-2c76-7592-b3c0-756adbb3caf2",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-004",
  ownLength: 232,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 4,
  prose: "txt",
  characters: ["character-player/otherwhere-xi-nala", "world-character/otherwhere-xi-tobin-ashlar"],
  stepStatus: "step-status/reviewers",
  action:
    '"The Old Empire...is that the one that is overrun by the dead? Where am I precisely? I think these waystones may have taken me much farther than most."',
  beats: [
    'Nala asks, "The Old Empire... is that the one that is overrun by the dead?"',
    '"Where am I, precisely? I think these waystones may have taken me much farther than most."',
    'Tobin\'s eyes go wide. "Harrak? You know about Harrak?"',
    "\"That's over the sea, in Param. The dead took it before anyone's grandmother was born.\"",
    '"Joss the carter says a witch-queen rules the dead lands now. He hears things in Imra."',
    'He points his crook at her, pleased. "So you are from Param. I knew it."',
    "\"Here's the Tavel valley. Asmirel. Prince Tavaris's land, may Sardanal bless him.\"",
    "\"Tavelford's down there, where the smoke is. Imra's two days on, down the river.\"",
    "Then the rest of what she said reaches him, and the grin goes.",
    'He looks up the road at the ring, then back at her. "Waystones don\'t take anybody anywhere."',
    '"They\'re shrines. You touch the key, and then you walk. On your own feet." He sounds less sure.',
    "Smoke gives up on her toes and sits against her shin, warm and heavy, leaning.",
    '"Mam knows all the old tales. She\'d know if..." He stops and chews his lip.',
    "\"Our farm's the first house down the road. I've got the flock till noon, but Mam's home.\"",
    "He points: far below, a stone house and a sheepfold are coming out of the mist.",
  ],
  lore: [
    "lore/otherwhere-xi-tobin-ashlar",
    "place/otherwhere-xi-waystone-shrine",
    "place/otherwhere-xi-asmirel",
  ],
  endsAt: "2026-09-28T06:30:00.000Z",
} as const satisfies StoryTurnPlayed
