import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const pathsSheetCheck = {
  id: "01a182db-5bf2-7093-8157-d86f948b1bee",
  type: "page-type/story-played",
  slug: "paths-sheet-check",
  coordinatorAgent: "iris-game-master-paths-sheet-check",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:04:00.000Z",
  title: "Test Story",
  world: "world/paths-sheet-check-world",
  unit: "unit/words",
  externalId: "paths-sheet-check",
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
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies StoryPlayed
