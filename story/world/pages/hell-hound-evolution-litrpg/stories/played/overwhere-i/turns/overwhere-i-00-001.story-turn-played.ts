import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00001 = {
  id: "01a0ed0c-f18e-797b-9022-cb8731079189",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-001",
  cover: "image/image-9f67aa201a67ff7d",
  partOfCollections: ["story-played/overwhere-i"],
  position: 1,
  ownLength: 334,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/overwhere-i-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/overwhere-i-nala", "place/overwhere-i-greyfen-ford"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
