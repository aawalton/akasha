import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00052 = {
  id: "01a0e853-1e55-74a6-b08e-4464b8d65e1b",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-052",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 52,
  turnStatus: "turn-status/game-master",
  action: "\"Hi there, I'm Alan, what's your name?\"",
  lore: ["lore/the-dating-game-talia"],
} as const satisfies StoryTurnPlayed
