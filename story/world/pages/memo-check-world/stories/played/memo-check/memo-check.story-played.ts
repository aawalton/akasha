import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const memoCheck = {
  id: "01a1832d-38c0-7793-8d16-29fa89f6c0fa",
  type: "page-type/story-played",
  slug: "memo-check",
  coordinatorAgent: "iris-game-master-memo-check",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:04:00.000Z",
  title: "Test Story",
  world: "world/memo-check-world",
  unit: "unit/words",
  externalId: "memo-check",
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
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies StoryPlayed
