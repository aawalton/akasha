import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00001 = {
  id: "01a0ed0c-f18e-797b-9022-cb8731079189",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-001",
  partOfCollections: ["story-played/overwhere-i"],
  position: 1,
  ownLength: 334,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/recorders",
  lore: ["lore/overwhere-i-nala", "place/overwhere-i-greyfen-ford"],
  recordedBy: ["story-recorder/mechanics"],
} as const satisfies StoryTurnPlayed
