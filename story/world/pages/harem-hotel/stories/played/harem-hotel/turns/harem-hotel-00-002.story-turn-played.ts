import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const haremHotel00002 = {
  id: "01a0e843-4f81-7572-9f9b-63017adca42f",
  type: "page-type/story-turn-played",
  slug: "harem-hotel-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/harem-hotel"],
  position: 2,
  turnStatus: "turn-status/game-master",
  action: '"Okay..." I stand up. "I\'m on my feet, check me in?"',
  lore: ["lore/harem-hotel-odile"],
} as const satisfies StoryTurnPlayed
