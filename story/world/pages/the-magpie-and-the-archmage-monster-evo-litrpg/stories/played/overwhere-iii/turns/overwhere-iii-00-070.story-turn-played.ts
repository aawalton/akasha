import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00070 = {
  id: "01a0fe68-1b6a-7736-b5e7-483b126b8f4a",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-070",
  cover: "image/image-18ff548fd9447611",
  ownLength: 237,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 70,
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-marda-hesk"],
  stepStatus: "step-status/player",
  action:
    "“Could you help me understand a few things, Marda? How do I level up faster and what do skill rarities mean?”",
  beats: "jsonl",
  lore: [
    "lore/overwhere-iii-marda-hesk",
    "lore/overwhere-iii-nala",
    "lore/overwhere-iii-nala-2",
    "lore/overwhere-iii-nala-3",
    "lore/overwhere-iii-the-system",
    "place/overwhere-iii-merrowgate-guild-post",
  ],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/style"],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/memory",
    "story-recorder/mechanics",
    "story-recorder/picture",
  ],
  endsAt: "2026-10-07T11:30:00.000Z",
  coverAfter: '"Two of like level can be fused, for good." Her eyes narrow at you.',
} as const satisfies StoryTurnPlayed
