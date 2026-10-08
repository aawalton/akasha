import type { StoryPlayed } from "akasha/story/world/stories/played/story-played.page-type.types.ts"

export const theDatingGame = {
  id: "01a0de37-a4ce-75e7-b1cc-7be7e09c8244",
  type: "page-type/story-played",
  slug: "the-dating-game",
  title: "The Dating Game",
  world: "world/personas",
  unit: "unit/words",
  externalId: "the-dating-game",
  coordinatorAgent: "mari-game-master-the-dating-game",
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/player-intent",
  ],
  createdAt: "2026-09-26T14:56:23.758Z",
  updatedAt: "2026-10-03T21:55:00.000Z",
} as const satisfies StoryPlayed
