import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00003 = {
  id: "01a0e37b-012f-79a3-95be-a839d5617eb4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 3,
  turnStatus: "turn-status/game-master",
  action: "I walk over and put my hand on the trunk.",
  lore: ["place/otherwhere-core-chamber"],
} as const satisfies StoryTurnPlayed
