import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00008 = {
  id: "01a0ea56-887e-7614-8c68-e8d7c6737899",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 8,
  stepStatus: "step-status/game-master",
  action:
    '"This is a deep secret, and in some places men have died for speaking it. I would not want to risk your repaying your hospitality with unkindness, so let me test your readiness for this secret first. When the sun rises in the morning and sets in the evening, what is moving?"',
  lore: ["lore/otherwhere-iv-gu-household", "lore/otherwhere-iv-heavens-and-dao"],
} as const satisfies StoryTurnPlayed
