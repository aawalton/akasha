import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00002 = {
  id: "01a0ea7a-9cfb-7649-8a8b-9a8428deaf3e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 2,
  stepStatus: "step-status/game-master",
  action: "I start walking towards the houses, looking for people.",
  lore: [
    "place/otherwhere-xi-tavelford",
    "place/otherwhere-xi-waystone-shrine",
    "place/otherwhere-xi-wether-hills",
  ],
} as const satisfies StoryTurnPlayed
