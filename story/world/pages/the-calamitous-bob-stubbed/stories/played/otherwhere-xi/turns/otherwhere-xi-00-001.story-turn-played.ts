import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereXi00001 = {
  id: "01a0ea63-e9de-79a2-b590-9e720a2df52a",
  type: "page-type/story-turn-played",
  slug: "otherwhere-xi-00-001",
  cover: "image/image-d2f3893d211d8bee",
  partOfCollections: ["story-played/otherwhere-xi"],
  position: 1,
  ownLength: 396,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-xi-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/otherwhere-xi-nala", "place/otherwhere-xi-waystone-shrine"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
