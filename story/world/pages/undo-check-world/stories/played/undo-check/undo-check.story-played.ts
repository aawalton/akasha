import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const undoCheck = {
  id: "01a18309-e114-7695-ae6e-4374ba2a9ccd",
  type: "page-type/story-played",
  slug: "undo-check",
  coordinatorAgent: "iris-game-master-undo-check",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:04:00.000Z",
  title: "Test Story",
  world: "world/undo-check-world",
  unit: "unit/words",
  externalId: "undo-check",
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
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies StoryPlayed
