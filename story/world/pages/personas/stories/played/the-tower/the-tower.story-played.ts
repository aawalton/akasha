import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const theTower = {
  id: "01a06425-4433-7452-bd78-2410fa95fb44",
  type: "page-type/story-played",
  slug: "the-tower",
  title: "The Tower",
  world: "world/personas",
  unit: "unit/words",
  externalId: "the-tower",
  coordinatorAgent: "iris-game-master-the-tower",
  chapterBreak: "A new floor begins.",
  panels: [
    "played-panel/time",
    "played-panel/tower-hud",
    "played-panel/tower-player-character",
    "played-panel/story-so-far",
    "played-panel/player-intent",
  ],
  createdAt: "2026-09-02T22:02:39.027Z",
  updatedAt: "2026-10-03T21:27:44.000Z",
} as const satisfies StoryPlayed
