import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const pendingRollTrial = {
  id: "01a183cf-b828-7225-a176-2acc78cbe3b2",
  type: "page-type/story-played",
  slug: "pending-roll-trial",
  coordinatorAgent: "iris-game-master-pending-roll-trial",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:04:00.000Z",
  title: "Test Story",
  world: "world/pending-roll-trial-world",
  unit: "unit/words",
  externalId: "pending-roll-trial",
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
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies StoryPlayed
