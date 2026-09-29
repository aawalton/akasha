import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00004 = {
  id: "01a0eaa1-2c76-7592-b3c0-756adbb3caf2",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 4,
  stepStatus: "step-status/game-master",
  action:
    '"The Old Empire...is that the one that is overrun by the dead? Where am I precisely? I think these waystones may have taken me much farther than most."',
  lore: [
    "lore/otherwhere-xi-tobin-ashlar",
    "place/otherwhere-xi-waystone-shrine",
    "place/otherwhere-xi-asmirel",
  ],
} as const satisfies StoryTurnPlayed
