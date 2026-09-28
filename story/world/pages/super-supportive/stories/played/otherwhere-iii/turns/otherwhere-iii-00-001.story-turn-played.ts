import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIii00001 = {
  id: "01a0e9dc-d715-7c6b-9768-c90c38b9256e",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iii-00-001",
  cover: "image/image-a58c5f8ce74ccb3e",
  partOfCollections: ["story-played/otherwhere-iii"],
  position: 1,
  ownLength: 681,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-iii-nala"],
  stepStatus: "step-status/player",
  lore: [
    "lore/otherwhere-iii-nala",
    "place/otherwhere-iii-chicago",
    "place/otherwhere-iii-belmont-platform",
  ],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2037-01-31T04:45:00.000Z",
} as const satisfies StoryTurnPlayed
