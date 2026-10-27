import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00012 = {
  id: "01a17fb9-7faa-784a-bf64-8dec122bf82d",
  type: "page-type/story-turn-played",
  slug: "test-story-00-012",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 12,
  stepStatus: "step-status/game-master",
  action:
    "Each day I drill swordplay in the hall from morning to evening, until my swordplay reaches its next rung, for at most 10 days.",
  createdAt: "2026-10-27T23:37:05.705Z",
  updatedAt: "2026-10-27T23:37:16.482Z",
} as const satisfies StoryTurnPlayed
