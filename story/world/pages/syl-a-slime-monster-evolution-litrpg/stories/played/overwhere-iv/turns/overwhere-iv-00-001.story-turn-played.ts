import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereIv00001 = {
  id: "01a0ed13-3fe1-7e8f-8f99-d71dc67c85ce",
  type: "page-type/story-turn-played",
  slug: "overwhere-iv-00-001",
  cover: "image/image-6622339941ca6be3",
  partOfCollections: ["story-played/overwhere-iv"],
  position: 1,
  ownLength: 341,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/overwhere-iv-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/overwhere-iv-nala", "place/overwhere-iv-millbrook-common"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
