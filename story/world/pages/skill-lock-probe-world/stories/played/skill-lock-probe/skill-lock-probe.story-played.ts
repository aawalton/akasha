import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const skillLockProbe = {
  id: "01a17ff2-6f78-7240-a4ac-f9d7ecd3f3ec",
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
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies StoryPlayed
