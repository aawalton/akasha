import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVi00001 = {
  id: "01a0ea1d-18cf-7202-91ce-b2f8fa31d84d",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vi-00-001",
  partOfCollections: ["story-played/otherwhere-vi"],
  position: 1,
  ownLength: 430,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-vi-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/otherwhere-vi-nala", "place/otherwhere-vi-moss-hollow"],
} as const satisfies StoryTurnPlayed
