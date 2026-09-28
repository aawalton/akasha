import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00004 = {
  id: "01a0ea4d-b4a7-7c44-a671-e8e7c9c24d57",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 4,
  stepStatus: "step-status/game-master",
  action:
    "As it gets close, I jump up into the air as high as I can, then try to land on top of it with all of my weight.",
  lore: ["lore/otherwhere-ix-shardback", "lore/otherwhere-ix-nala"],
} as const satisfies StoryTurnPlayed
