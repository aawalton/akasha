import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const skillLockProbe = {
  id: "01a17ff8-9a7f-78a8-9c5d-b48a943afb80",
  type: "page-type/story-played",
  slug: "skill-lock-probe",
  coordinatorAgent: "iris-game-master-skill-lock-probe",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:00:00.000Z",
  title: "Test Story",
  world: "world/skill-lock-probe-world",
  unit: "unit/words",
  externalId: "skill-lock-probe",
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
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies StoryPlayed
