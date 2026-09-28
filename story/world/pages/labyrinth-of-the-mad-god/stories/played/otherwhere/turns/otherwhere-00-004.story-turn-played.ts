import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00004 = {
  id: "01a0e9c2-63e9-793d-ab41-e87c388cc7ea",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 4,
  stepStatus: "step-status/game-master",
  action: "I try to ignore the ape and search along the beach instead, hoping it is safer.",
  lore: [
    "place/otherwhere-black-shore",
    "lore/otherwhere-copperbacks",
    "lore/otherwhere-cinder-isle-plants",
  ],
} as const satisfies StoryTurnPlayed
