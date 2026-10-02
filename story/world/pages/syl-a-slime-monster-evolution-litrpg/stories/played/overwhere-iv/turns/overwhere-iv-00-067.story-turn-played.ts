import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00067 = {
  id: "01a0fe49-0fba-71dd-b043-46da1733c869",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-067",
  cover: "image/image-c0cef0aacde73d27",
  ownLength: 104,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 67,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/player",
  action:
    "“Hah! I’m sure the sharpening helped, it kept the beast from me just long enough for it to die, but the shaft splintered at the head”",
  beats: [
    '"Hah! I\'m sure the sharpening helped. It kept the beast off me just long enough to die."',
    '"But the shaft splintered at the head."',
    "Tobin grunts. Something at the corner of his mouth almost moves, and goes still again.",
    '"Old ash. Splits at the socket, under a weight like that." He taps the new spear below the blade.',
    "Two rivets sit there, through the socket and the wood.",
    '"Riveted twice. That won\'t go."',
    "He looks at the leaf blade a moment, then at her.",
    '"If it ran up the shaft at you, a crossbar behind the head would stop it. Twenty copper."',
  ],
  lore: [
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
    "place/overwhere-iv-millbrook-smithy",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-05T10:03:00.000Z",
  coverAfter: '"If it ran up the shaft at you, a crossbar behind the head',
} as const satisfies StoryTurnPlayed
