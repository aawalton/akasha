import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const theDatingGame00003 = {
  id: "01a0e2f3-f40b-7df7-83f1-a6ec0ec9ab62",
  type: "page-type/story-turn-played",
  slug: "the-dating-game-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/the-dating-game"],
  position: 3,
  turnStatus: "turn-status/game-master",
  action:
    '"Hi there! Would you be interested in some company? I\'d love someone to chat with on the hike."',
  lore: ["lore/the-dating-game-boulder-woman"],
} as const satisfies StoryTurnPlayed
