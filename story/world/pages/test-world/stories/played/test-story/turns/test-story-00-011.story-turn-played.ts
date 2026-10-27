import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00011 = {
  id: "01a17f86-d46e-79f4-8f9d-868402d8664e",
  type: "page-type/story-turn-played",
  slug: "test-story-00-011",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 11,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/beats",
  action: "For each of the next 5 days I drill swordplay in the hall, from morning to evening.",
  beats: "jsonl",
  lore: ["lore/test-world-overview"],
  createdAt: "2026-10-27T22:41:45.069Z",
  updatedAt: "2026-10-27T22:48:40.356Z",
  ownLength: 53,
  endsAt: "2026-11-11T09:30:00.000Z",
} as const satisfies StoryTurnPlayed
