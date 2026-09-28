import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00069 = {
  id: "01a0e843-ed51-7a30-89b1-ffc79de768d2",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-069",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 69,
  turnStatus: "turn-status/game-master",
  action: "**Links, how long until the main floor is cleared at this rate?**",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
