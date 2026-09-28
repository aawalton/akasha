import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00038 = {
  id: "01a0e553-e3f4-7552-8ab9-1bf5b1457204",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-038",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 38,
  turnStatus: "turn-status/game-master",
  action:
    "I check the wardrobe to see what is available after several hundred years without a librarian.",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
