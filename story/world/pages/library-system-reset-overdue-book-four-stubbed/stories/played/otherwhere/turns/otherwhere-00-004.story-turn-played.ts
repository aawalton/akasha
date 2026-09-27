import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00004 = {
  id: "01a0e384-f021-77ff-b75a-4b71dcd52621",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 4,
  turnStatus: "turn-status/game-master",
  action: "I put my other hand to the second light",
  lore: ["place/otherwhere-core-chamber"],
} as const satisfies StoryTurnPlayed
