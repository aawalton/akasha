import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00049 = {
  id: "01a0e5af-a2ab-7920-af9c-7f74a6311a0c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-049",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 49,
  turnStatus: "turn-status/game-master",
  action: "I grab the last sack and shove it as deep as I can get",
  lore: ["place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
