import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIx00001 = {
  id: "01a0ea1f-9145-702c-93b6-0a5b4014ceb3",
  type: "page-type/story-turn-played",
  slug: "otherwhere-ix-00-001",
  partOfCollections: ["story-played/otherwhere-ix"],
  position: 1,
  ownLength: 450,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-ix-nala"],
  stepStatus: "step-status/recorders",
  lore: ["lore/otherwhere-ix-nala", "place/otherwhere-ix-glassgrass-flats"],
} as const satisfies StoryTurnPlayed
