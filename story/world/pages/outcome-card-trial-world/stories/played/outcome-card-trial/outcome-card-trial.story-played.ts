import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const outcomeCardTrial = {
  id: "01a183ae-dc71-7935-8e56-87af5f105aa2",
  type: "page-type/story-played",
  slug: "outcome-card-trial",
  coordinatorAgent: "iris-game-master-outcome-card-trial",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:04:00.000Z",
  title: "Test Story",
  world: "world/outcome-card-trial-world",
  unit: "unit/words",
  externalId: "outcome-card-trial",
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
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies StoryPlayed
