import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00001 = {
  id: "01a0ed0f-bfd1-7f60-816a-99e9f0cf0d1c",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-001",
  cover: "image/image-96e5330c05429b6f",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 1,
  ownLength: 342,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/overwhere-ii-nala", "place/overwhere-ii-tern-hollow"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
