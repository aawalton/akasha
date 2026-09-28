import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00002 = {
  id: "01a0e988-3891-7a73-840e-807fe03e944c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 2,
  stepStatus: "step-status/game-master",
  action:
    "I start walking towards the mountain, taking care to move quietly and observe carefully, especially for any signs of danger.",
  lore: [
    "place/otherwhere-cinder-isle",
    "place/otherwhere-lowland-wood",
    "place/otherwhere-old-strangler",
    "place/otherwhere-glassrun",
    "place/otherwhere-black-shore",
    "lore/otherwhere-copperbacks",
    "lore/otherwhere-mire-monitors",
    "lore/otherwhere-ashback",
    "lore/otherwhere-cinder-isle-plants",
  ],
} as const satisfies StoryTurnPlayed
