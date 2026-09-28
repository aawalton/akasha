import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00003 = {
  id: "01a0ea0e-2e28-7129-8f99-d24fefb062ea",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 3,
  stepStatus: "step-status/game-master",
  action:
    "“I am a spirit of knowledge who recently achieved physical form. If you can deliver me safely to the nearest orthodox sect, you will be rewarded. If that is beyond you, I will have to find another.”",
  lore: ["lore/otherwhere-iv-three-stones-folk", "lore/otherwhere-iv-hidden-spring-sect"],
} as const satisfies StoryTurnPlayed
