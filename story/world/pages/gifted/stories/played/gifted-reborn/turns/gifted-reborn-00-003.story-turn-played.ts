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
  stepStatus: "step-status/beats",
  action: "I kick twice",
  beats: "jsonl",
  lore: ["lore/gifted-reborn-nala"],
  endsAt: "2026-10-27T20:45:00.000Z",
  createdAt: "2026-10-28T00:03:14.967Z",
  updatedAt: "2026-10-28T00:08:58.248Z",
  ownLength: 11,
} as const satisfies StoryTurnPlayed
