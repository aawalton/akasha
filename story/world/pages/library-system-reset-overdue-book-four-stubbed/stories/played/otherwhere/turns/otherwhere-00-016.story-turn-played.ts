import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00016 = {
  id: "01a0e49b-fab5-73e0-be55-1578042475a5",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-016",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 16,
  turnStatus: "turn-status/game-master",
  action: "I keep it there until it stops moving",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
