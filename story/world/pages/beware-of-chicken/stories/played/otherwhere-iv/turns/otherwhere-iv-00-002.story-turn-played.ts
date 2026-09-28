import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00002 = {
  id: "01a0e9f1-31b2-7790-adbb-bbc195f510e9",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 2,
  stepStatus: "step-status/game-master",
  action: "A start walking toward the village, keeping my eyes and ears open for signs of danger",
  lore: [
    "place/otherwhere-iv-three-stones-village",
    "lore/otherwhere-iv-three-stones-folk",
    "place/otherwhere-iv-willow-bend",
  ],
} as const satisfies StoryTurnPlayed
