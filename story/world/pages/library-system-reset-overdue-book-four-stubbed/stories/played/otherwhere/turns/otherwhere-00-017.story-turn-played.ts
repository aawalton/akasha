import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00017 = {
  id: "01a0e4a2-ba45-7a22-9f77-0741d748b5be",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-017",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 17,
  turnStatus: "turn-status/game-master",
  action:
    "“Okay, that was harder than expected. Is there an easy way here that I’m missing, or were you really expecting me to take on a room of these with a broom?”",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
