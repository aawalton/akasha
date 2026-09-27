import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00008 = {
  id: "01a0e3c3-9cec-74bc-9265-647835b7c9b8",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 8,
  turnStatus: "turn-status/game-master",
  action: "I follow Links up the stairs",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
