import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const probeTwo = {
  id: "01a17fbf-aff5-75ff-ac5a-0ca7d7ba0924",
  type: "page-type/story-played",
  slug: "probe-two",
  coordinatorAgent: "iris-game-master-probe-two",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-11T09:30:00.000Z",
  title: "Test Story",
  world: "world/probe-two-world",
  unit: "unit/words",
  externalId: "probe-two",
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
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies StoryPlayed
