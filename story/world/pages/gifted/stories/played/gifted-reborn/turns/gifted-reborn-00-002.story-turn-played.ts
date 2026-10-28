import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedReborn00002 = {
  id: "01a17fb4-a4df-7447-83e8-36a68fce902c",
  type: "page-type/story-turn-played",
  slug: "gifted-reborn-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-reborn"],
  position: 2,
  prose: "txt",
  characters: ["character-player/gifted-reborn-nala"],
  stepStatus: "step-status/player",
  action:
    "I turn the tables and try to devour the demon while it is weakened like it tried to devour me",
  beats: "jsonl",
  lore: [
    "lore/gifted-lesser-demon-prince",
    "lore/gifted-reborn-nala",
    "lore/gifted-souls-and-demons",
  ],
  reviewedBy: [
    "story-reviewer/continuity",
    "story-reviewer/scene",
    "story-reviewer/holdings",
    "story-reviewer/style",
  ],
  endsAt: "2026-10-27T20:40:00.000Z",
  createdAt: "2026-10-27T23:31:47.551Z",
  updatedAt: "2026-10-28T00:02:14.415Z",
  ownLength: 280,
} as const satisfies StoryTurnPlayed
