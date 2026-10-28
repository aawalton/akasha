import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const giftedReborn00003 = {
  id: "01a17fd1-7197-7bc0-8724-323aab45fd9b",
  type: "page-type/story-turn-played",
  slug: "gifted-reborn-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/gifted-reborn"],
  position: 3,
  prose: "txt",
  characters: ["character-player/gifted-reborn-nala"],
  stepStatus: "step-status/player",
  action: "I kick twice",
  beats: "jsonl",
  lore: ["lore/gifted-reborn-nala"],
  reviewedBy: [
    "story-reviewer/holdings",
    "story-reviewer/style",
    "story-reviewer/scene",
    "story-reviewer/continuity",
  ],
  endsAt: "2026-10-27T20:45:00.000Z",
  createdAt: "2026-10-28T00:03:14.967Z",
  updatedAt: "2026-10-28T15:31:42.522Z",
  ownLength: 230,
  outcomes: "jsonl",
} as const satisfies StoryTurnPlayed
