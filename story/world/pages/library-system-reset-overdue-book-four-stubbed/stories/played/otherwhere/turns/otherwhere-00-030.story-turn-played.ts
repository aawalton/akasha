import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00030 = {
  id: "01a0e516-ca38-7d82-ad3b-ce479f40e98e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-030",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 30,
  turnStatus: "turn-status/game-master",
  action: "I wait until this one stops moving, then I repeat the process for the last small one",
  lore: ["place/otherwhere-hall-back"],
} as const satisfies StoryTurnPlayed
