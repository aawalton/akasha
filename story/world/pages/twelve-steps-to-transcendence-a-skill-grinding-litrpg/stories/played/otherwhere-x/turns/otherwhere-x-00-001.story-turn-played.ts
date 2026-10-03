import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereX00001 = {
  id: "01a0ea61-14d4-74bd-8cba-cf9bf9862bc6",
  type: "page-type/story-turn-played",
  slug: "otherwhere-x-00-001",
  cover: "image/image-9d2afb45777aa7ea",
  coverAfter: "Your shirt is your shirt. The old dark grey one, but it",
  partOfCollections: ["story-played/otherwhere-x"],
  position: 1,
  ownLength: 423,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-x-nala"],
  stepStatus: "step-status/player",
  beats: "jsonl",
  lore: ["lore/otherwhere-x-nala", "place/otherwhere-x-harrow-mile"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
} as const satisfies StoryTurnPlayed
