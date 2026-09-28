import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00001 = {
  id: "01a0de62-5a87-7a78-be8c-3c831049d8bd",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-001",
  cover: "image/image-6de0c59d9cd2bfca",
  partOfCollections: ["story-played/the-dating-game"],
  position: 1,
  ownLength: 259,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/the-dating-game-alan"],
  turnStatus: "turn-status/player",
  endsAt: "2026-09-26T08:15:00.000Z",
} as const satisfies StoryTurnPlayed
