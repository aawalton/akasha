import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00021 = {
  id: "01a0e4da-c957-72ef-b9b1-a24f69c01be8",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-021",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 21,
  turnStatus: "turn-status/game-master",
  action:
    "I reach out with the broom and hook it around one of the worms, pulling it into the salt",
  lore: ["place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
