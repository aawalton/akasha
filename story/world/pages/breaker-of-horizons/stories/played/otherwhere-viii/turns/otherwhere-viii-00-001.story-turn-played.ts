import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereViii00001 = {
  id: "01a0ea1e-b33b-7ba0-ba58-c7fd7639d3f1",
  type: "page-type/story-turn-played",
  slug: "otherwhere-viii-00-001",
  cover: "image/image-2442ece9884cbeb1",
  partOfCollections: ["story-played/otherwhere-viii"],
  position: 1,
  ownLength: 450,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-viii-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/otherwhere-viii-nala", "place/otherwhere-viii-weir-gardens"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
