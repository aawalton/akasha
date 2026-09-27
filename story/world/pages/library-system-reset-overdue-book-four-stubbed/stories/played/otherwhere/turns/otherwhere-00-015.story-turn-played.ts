import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00015 = {
  id: "01a0e496-745a-7809-8f3b-2411a6882500",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-015",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 15,
  turnStatus: "turn-status/game-master",
  action: "I push it over onto the salt and hold it there",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
