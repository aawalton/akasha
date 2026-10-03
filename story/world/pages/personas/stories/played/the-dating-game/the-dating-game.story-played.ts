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
  playerIntent:
    "He keeps to his routine: he eats when he is hungry, drinks when he is dry, and sleeps indoors at night.",
  panels: [
    "played-panel/player-character",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/player-intent",
  ],
} as const satisfies StoryPlayed
