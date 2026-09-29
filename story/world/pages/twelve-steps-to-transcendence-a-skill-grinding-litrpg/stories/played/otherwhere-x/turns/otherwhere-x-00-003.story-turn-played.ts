import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00003 = {
  id: "01a0ea8d-4e45-721e-9193-dae99fad9e35",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 3,
  stepStatus: "step-status/game-master",
  action: '"Hi there, would you mind pointing me in the direction of your parents?"',
  lore: ["place/otherwhere-x-harrow"],
} as const satisfies StoryTurnPlayed
