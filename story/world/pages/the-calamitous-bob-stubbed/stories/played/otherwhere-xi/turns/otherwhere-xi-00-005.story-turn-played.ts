import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00005 = {
  id: "01a0eaab-bd33-7fc5-a004-43ca4cf9e338",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 5,
  stepStatus: "step-status/game-master",
  action: '"Would you take me to talk to your Mam?"',
  lore: [
    "place/otherwhere-xi-ashlar-farm",
    "lore/otherwhere-xi-wenna-ashlar",
    "lore/otherwhere-xi-tobin-ashlar",
  ],
} as const satisfies StoryTurnPlayed
