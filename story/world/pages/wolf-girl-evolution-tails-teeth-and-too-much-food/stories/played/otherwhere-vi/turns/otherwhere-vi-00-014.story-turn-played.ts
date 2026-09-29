import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00014 = {
  id: "01a0eb13-30c5-74b2-a781-dedc57aee5f4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-014",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 14,
  stepStatus: "step-status/game-master",
  action:
    '"No one is hunting me, but I am owned by no village either, which means the village maybe not be safe for me. Are there other options for healing? If I increase my level or stats, would that be enough?"',
  lore: [
    "lore/otherwhere-vi-customs",
    "lore/otherwhere-vi-nala",
    "place/otherwhere-vi-brackenford",
    "place/otherwhere-vi-charcoal-camp",
    "place/otherwhere-vi-wenmarch",
  ],
} as const satisfies StoryTurnPlayed
