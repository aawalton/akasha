import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const cloneProbe = {
  id: "01a17f3e-4455-7a0e-a765-94beb557b8b8",
  type: "page-type/story-played",
  slug: "clone-probe",
  coordinatorAgent: "iris-game-master-clone-probe",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-06T08:44:00.000Z",
  title: "Test Story",
  world: "world/test-world",
  unit: "unit/words",
  externalId: "clone-probe",
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
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies StoryPlayed
