import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00002 = {
  id: "01a0e988-3891-7a73-840e-807fe03e944c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 2,
  stepStatus: "step-status/world-builder",
  action:
    "I start walking towards the mountain, taking care to move quietly and observe carefully, especially for any signs of danger.",
} as const satisfies StoryTurnPlayed
