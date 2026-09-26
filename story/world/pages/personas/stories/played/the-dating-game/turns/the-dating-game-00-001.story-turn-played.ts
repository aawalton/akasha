import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00001 = {
  id: "01a0de62-5a87-7a78-be8c-3c831049d8bd",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-001",
  partOfCollections: ["story-played/the-dating-game"],
  position: 1,
  ownLength: 270,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/the-dating-game-alan"],
  turnStatus: "turn-status/player",
} as const satisfies StoryTurnPlayed
