import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00014 = {
  id: "01a0e490-72a0-7965-b7ad-172ecd36a65c",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-014",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 14,
  turnStatus: "turn-status/game-master",
  action: "I quietly go and get the scoop, then give the bookworm one more careful scoop of salt",
  lore: ["place/otherwhere-main-hall"],
} as const satisfies StoryTurnPlayed
