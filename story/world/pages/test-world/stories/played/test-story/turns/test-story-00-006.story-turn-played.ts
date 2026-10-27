import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00006 = {
  id: "01a17f05-8de4-781f-baeb-9fc85bb26086",
  type: "page-type/story-turn-played",
  slug: "test-story-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 6,
  stepStatus: "step-status/world-builder",
  action: "I ask to buy one of the lamps, pay her for it, and light it there at the counter.",
  createdAt: "2026-10-27T20:20:32.867Z",
  updatedAt: "2026-10-27T20:20:32.867Z",
} as const satisfies StoryTurnPlayed
