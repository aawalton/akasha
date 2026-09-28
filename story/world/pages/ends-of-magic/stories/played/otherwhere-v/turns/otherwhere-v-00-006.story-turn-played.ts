import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereV00006 = {
  id: "01a0ea31-818d-786b-934c-7cb8f3d873ac",
  type: "page-type/story-turn-played",
  slug: "otherwhere-v-00-006",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-v"],
  position: 6,
  stepStatus: "step-status/game-master",
  action:
    "I turn and catch the jaws with my hands, then wrap my thighs around it's neck and squeeze the breath out of it.",
  lore: ["lore/otherwhere-v-gloamcat", "lore/otherwhere-v-injury"],
} as const satisfies StoryTurnPlayed
