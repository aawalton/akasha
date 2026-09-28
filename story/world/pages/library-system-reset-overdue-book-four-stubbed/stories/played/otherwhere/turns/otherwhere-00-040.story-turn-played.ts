import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00040 = {
  id: "01a0e560-408c-72dc-a3f1-008ca86b4626",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-040",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 40,
  turnStatus: "turn-status/game-master",
  action: "I take a loaf, and then eat chunks of it while I walk around to explore.",
  lore: ["place/otherwhere-kitchen"],
} as const satisfies StoryTurnPlayed
