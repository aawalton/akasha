import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const haremHotel00001 = {
  id: "01a0e82f-30cc-7574-bde0-66d04b15463f",
  type: "page-type/story-turn-played",
  slug: "harem-hotel-00-001",
  partOfCollections: ["story-played/harem-hotel"],
  position: 1,
  unit: "unit/words",
  turnStatus: "turn-status/world-builder",
} as const satisfies StoryTurnPlayed
