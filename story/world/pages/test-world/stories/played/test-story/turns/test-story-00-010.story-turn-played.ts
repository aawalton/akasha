import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00010 = {
  id: "01a17f62-f720-7213-9210-560fa502059c",
  type: "page-type/story-turn-played",
  slug: "test-story-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 10,
  stepStatus: "step-status/game-master",
  action: "I wait by the hearth a while.",
  createdAt: "2026-10-27T22:02:34.656Z",
  updatedAt: "2026-10-27T22:02:45.544Z",
} as const satisfies StoryTurnPlayed
