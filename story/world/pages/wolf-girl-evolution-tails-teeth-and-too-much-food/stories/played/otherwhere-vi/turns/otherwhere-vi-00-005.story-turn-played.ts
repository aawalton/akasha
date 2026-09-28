import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00005 = {
  id: "01a0ea4c-be31-7a60-b583-1db545f2c44e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 5,
  stepStatus: "step-status/game-master",
  action:
    "I keep moving, but watch for a sturdy branch I can turn into a walking stick and defensive staff, to make myself less of an easy target. Until I find one, I pick up a fist sized rock from the riverbank.",
  lore: ["place/otherwhere-vi-hollow-stream"],
} as const satisfies StoryTurnPlayed
