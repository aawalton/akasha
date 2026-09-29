import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIii00001 = {
  id: "01a0ed11-621a-77b0-bddd-abf1d8a697f0",
  type: "page-type/story-turn-played",
  slug: "overwhere-iii-00-001",
  partOfCollections: ["story-played/overwhere-iii"],
  position: 1,
  ownLength: 334,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/overwhere-iii-nala"],
  stepStatus: "step-status/recorders",
  lore: ["lore/overwhere-iii-nala", "place/overwhere-iii-wrenwood-crossroads"],
} as const satisfies StoryTurnPlayed
