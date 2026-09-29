import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIi00001 = {
  id: "01a0ed0f-bfd1-7f60-816a-99e9f0cf0d1c",
  type: "page-type/story-turn-played",
  slug: "overwhere-ii-00-001",
  partOfCollections: ["story-played/overwhere-ii"],
  position: 1,
  ownLength: 342,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/overwhere-ii-nala"],
  stepStatus: "step-status/recorders",
  lore: ["lore/overwhere-ii-nala", "place/overwhere-ii-tern-hollow"],
  recordedBy: ["story-recorder/mechanics"],
} as const satisfies StoryTurnPlayed
