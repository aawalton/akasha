import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const beatFlowTest = {
  id: "01a17f7f-6e81-7709-a804-0da1a0a4045e",
  type: "page-type/story-played",
  slug: "beat-flow-test",
  coordinatorAgent: "iris-game-master-beat-flow-test",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-06T09:30:00.000Z",
  title: "Test Story",
  world: "world/test-world",
  unit: "unit/words",
  externalId: "beat-flow-test",
  chapterBreak: "A thing the player set out to try is done.",
  difficulty: "difficulty-level/normal",
  panels: [
    "played-panel/player-character",
    "played-panel/other-characters",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/story-so-far",
    "played-panel/player-intent",
    "played-panel/difficulty",
    "played-panel/quest-list",
  ],
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies StoryPlayed
