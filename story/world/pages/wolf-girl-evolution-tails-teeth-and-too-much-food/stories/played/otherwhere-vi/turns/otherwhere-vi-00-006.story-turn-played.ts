import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00006 = {
  id: "01a0ea57-6ad0-7c2d-b410-9c6dcd93d316",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 6,
  stepStatus: "step-status/game-master",
  action: "I circle wide around the boars and continue downstream",
  lore: ["place/otherwhere-vi-hollow-stream"],
} as const satisfies StoryTurnPlayed
