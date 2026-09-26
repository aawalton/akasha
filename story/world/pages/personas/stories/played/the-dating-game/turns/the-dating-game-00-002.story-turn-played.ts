import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00002 = {
  id: "01a0de91-c157-7f6c-afd3-7ec7f69e7a94",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-002",
  partOfCollections: ["story-played/the-dating-game"],
  position: 2,
  ownLength: 493,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-echo"],
} as const satisfies StoryTurnPlayed
