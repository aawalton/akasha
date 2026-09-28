import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00057 = {
  id: "01a0e7d8-007f-7a73-b899-4a448846ce80",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-057",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 57,
  turnStatus: "turn-status/game-master",
  action: "I pause to read the book, then continue with the project",
  lore: ["place/otherwhere-main-hall", "lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
