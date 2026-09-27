import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00005 = {
  id: "01a0e390-05e7-74a4-99e0-7c638cbb9ae6",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 5,
  turnStatus: "turn-status/world-builder",
  action: '"Okay, I\'m in a magic library of some sort? Library, can you hear me?"',
} as const satisfies StoryTurnPlayed
