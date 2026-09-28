import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00001 = {
  id: "01a0e9e1-6706-726c-a0af-a18c95e72ed4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-001",
  cover: "image/image-851badc846f4f27a",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 1,
  ownLength: 620,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-iv-nala"],
  stepStatus: "step-status/player",
  lore: ["lore/otherwhere-iv-nala", "place/otherwhere-iv-willow-bend"],
  recordedBy: ["story-recorder/mechanics", "story-recorder/memory", "story-recorder/picture"],
  endsAt: "2026-09-28T05:40:00.000Z",
} as const satisfies StoryTurnPlayed
