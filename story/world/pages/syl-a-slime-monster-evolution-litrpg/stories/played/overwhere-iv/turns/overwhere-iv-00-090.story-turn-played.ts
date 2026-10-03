import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00090 = {
  id: "01a101a8-f47e-7869-9357-a2ac09b2b98f",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-090",
  cover: "image/image-c9e936f291e2de77",
  ownLength: 190,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 90,
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  stepStatus: "step-status/player",
  action:
    "I quietly take the ears and cores, then work my way back to town and report in at the guild.",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iv-ilsa-crane-2",
    "lore/overwhere-iv-millbrook-adventurers-hall-2",
    "lore/overwhere-iv-nala",
    "lore/overwhere-iv-nala-2",
    "lore/overwhere-iv-nala-3",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: [
    "story-recorder/mechanics",
    "story-recorder/memory",
    "story-recorder/inventory",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T12:56:00.000Z",
  coverAfter: '"A silver an ear, eight copper a core." Eight silver and a little heap',
} as const satisfies StoryTurnPlayed
