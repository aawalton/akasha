import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00001 = {
  id: "01a0e985-4ff0-7640-8da4-15041292f7c1",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-001",
  cover: "image/image-e15269b11eecbece",
  partOfCollections: ["story-played/otherwhere"],
  position: 1,
  ownLength: 640,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/otherwhere-nala", "place/otherwhere-black-shore"],
  endsAt: "2026-09-28T10:00:00.000Z",
} as const satisfies StoryTurnPlayed
