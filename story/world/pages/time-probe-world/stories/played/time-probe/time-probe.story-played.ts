import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const timeProbe = {
  id: "01a1802d-b13e-7913-ad7a-1016e30e23ad",
  type: "page-type/story-played",
  slug: "time-probe",
  coordinatorAgent: "iris-game-master-time-probe",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:04:00.000Z",
  title: "Test Story",
  world: "world/time-probe-world",
  unit: "unit/words",
  externalId: "time-probe",
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
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies StoryPlayed
