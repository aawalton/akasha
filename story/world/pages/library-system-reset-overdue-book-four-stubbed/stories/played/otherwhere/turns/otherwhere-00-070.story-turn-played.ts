import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00070 = {
  id: "01a0e930-9268-7437-8b3f-8e03e2500a0c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-070",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 70,
  turnStatus: "turn-status/game-master",
  action:
    "**Okay, let the work, I'd like you to identify books we've found that I should read to prepare for the opening**",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
