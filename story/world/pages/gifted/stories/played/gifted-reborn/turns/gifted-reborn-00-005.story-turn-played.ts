import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedReborn00005 = {
  id: "01a17fec-d9f5-7ff3-804e-cb36cb753f7d",
  type: "page-type/story-turn-played",
  slug: "gifted-reborn-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-reborn"],
  position: 5,
  stepStatus: "step-status/game-master",
  action: "I use Path of Soulstealing\n\nI use Path of the Completionist",
  lore: [
    "lore/gifted-myriad-paths",
    "lore/gifted-reborn-nala",
    "lore/gifted-souls-and-demons",
    "place/gifted-womb",
  ],
  createdAt: "2026-10-28T00:33:11.156Z",
  updatedAt: "2026-10-28T00:51:33.647Z",
} as const satisfies StoryTurnPlayed
