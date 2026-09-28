import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereVii00001 = {
  id: "01a0ea1d-df17-770b-abb6-857b9d17fa12",
  type: "page-type/story-turn-played",
  slug: "otherwhere-vii-00-001",
  cover: "image/image-ae66c547fc0a80d4",
  partOfCollections: ["story-played/otherwhere-vii"],
  position: 1,
  ownLength: 470,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-vii-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/otherwhere-vii-nala", "place/otherwhere-vii-ashford-road-ditch"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
