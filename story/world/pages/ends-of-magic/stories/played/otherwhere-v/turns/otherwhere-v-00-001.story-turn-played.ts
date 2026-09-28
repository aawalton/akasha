import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereV00001 = {
  id: "01a0e9e4-d520-7bf3-bfd9-4832d1f53d1b",
  type: "page-type/story-turn-played",
  slug: "otherwhere-v-00-001",
  partOfCollections: ["story-played/otherwhere-v"],
  position: 1,
  ownLength: 560,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-v-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/otherwhere-v-nala", "place/otherwhere-v-fern-hollow"],
  endsAt: "2026-09-28T17:20:00.000Z",
} as const satisfies StoryTurnPlayed
