import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const outcomeCardsCheck = {
  id: "01a17ffe-7d82-7ac8-9ae6-4a87df2ac510",
  type: "page-type/story-played",
  slug: "outcome-cards-check",
  coordinatorAgent: "iris-game-master-outcome-cards-check",
  clonedFrom: "story-played/test-story",
  opensAt: "2026-11-13T12:00:00.000Z",
  title: "Test Story",
  world: "world/outcome-cards-check-world",
  unit: "unit/words",
  externalId: "outcome-cards-check",
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
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies StoryPlayed
