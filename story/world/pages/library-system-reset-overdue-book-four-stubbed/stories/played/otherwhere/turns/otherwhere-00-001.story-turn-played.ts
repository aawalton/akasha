import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00001 = {
  id: "01a0e355-95e7-7c3d-8466-5c82f550ac3d",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-001",
  partOfCollections: ["story-played/otherwhere"],
  position: 1,
  ownLength: 796,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-alan"],
  turnStatus: "turn-status/player",
  lore: ["lore/otherwhere-alan", "place/otherwhere-core-chamber"],
} as const satisfies StoryTurnPlayed
