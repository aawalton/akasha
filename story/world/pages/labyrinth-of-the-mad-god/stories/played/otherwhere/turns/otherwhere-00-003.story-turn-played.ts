import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00003 = {
  id: "01a0e9a0-71ff-7481-bc59-9e1026e5af9e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 3,
  stepStatus: "step-status/game-master",
  action: "I run back the way I came, as fast as I can.",
  lore: [
    "lore/otherwhere-copperbacks",
    "place/otherwhere-lowland-wood",
    "place/otherwhere-black-shore",
  ],
} as const satisfies StoryTurnPlayed
