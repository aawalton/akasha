import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const pathsProbe = {
  id: "01a18008-7534-7b16-ac03-618b49f75e56",
  type: "page-type/story-played",
  slug: "paths-probe",
  coordinatorAgent: "iris-game-master-paths-probe",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:00:00.000Z",
  title: "Test Story",
  world: "world/paths-probe-world",
  unit: "unit/words",
  externalId: "paths-probe",
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
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies StoryPlayed
