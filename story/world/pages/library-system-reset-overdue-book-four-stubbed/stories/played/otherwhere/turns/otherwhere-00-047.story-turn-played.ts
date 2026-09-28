import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00047 = {
  id: "01a0e596-ad04-7154-a387-d497e2c64091",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-047",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 47,
  turnStatus: "turn-status/game-master",
  action:
    "I go back to the kitchen and bring over three more bags of salt, one at a time, then take another attempt and jamming one down the worms throat",
  lore: ["place/otherwhere-kitchen", "place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
