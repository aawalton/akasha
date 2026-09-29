import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00016 = {
  id: "01a0eb30-2183-7d50-88a0-6c769169c042",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-016",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 16,
  stepStatus: "step-status/game-master",
  action: "I check my status to see if the sleep recovered any HP, then focus on my task.",
  lore: ["lore/otherwhere-vi-nala", "place/otherwhere-vi-charcoal-camp"],
} as const satisfies StoryTurnPlayed
