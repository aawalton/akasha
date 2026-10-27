import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00011 = {
  id: "01a17f86-d46e-79f4-8f9d-868402d8664e",
  type: "page-type/story-turn-played",
  slug: "test-story-00-011",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 11,
  stepStatus: "step-status/game-master",
  action: "For each of the next 5 days I drill swordplay in the hall, from morning to evening.",
  createdAt: "2026-10-27T22:41:45.069Z",
  updatedAt: "2026-10-27T22:42:12.158Z",
} as const satisfies StoryTurnPlayed
