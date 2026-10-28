import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedReborn00005 = {
  id: "01a17fec-d9f5-7ff3-804e-cb36cb753f7d",
  type: "page-type/story-turn-played",
  slug: "gifted-reborn-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-reborn"],
  position: 5,
  prose: "txt",
  stepStatus: "step-status/beats",
  action: "I use Path of Soulstealing\n\nI use Path of the Completionist",
  beats: "jsonl",
  lore: [
    "lore/gifted-myriad-paths",
    "lore/gifted-reborn-nala",
    "lore/gifted-souls-and-demons",
    "place/gifted-womb",
  ],
  createdAt: "2026-10-28T00:33:11.156Z",
  updatedAt: "2026-10-28T01:00:48.621Z",
  ownLength: 177,
  endsAt: "2026-10-27T22:03:00.000Z",
  outcomes: "jsonl",
  characters: ["character-player/gifted-reborn-nala"],
} as const satisfies StoryTurnPlayed
