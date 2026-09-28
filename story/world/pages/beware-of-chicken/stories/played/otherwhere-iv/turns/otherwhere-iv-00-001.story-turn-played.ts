import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhereIv00001 = {
  id: "01a0e9e1-6706-726c-a0af-a18c95e72ed4",
  type: "page-type/story-turn-played",
  slug: "otherwhere-iv-00-001",
  partOfCollections: ["story-played/otherwhere-iv"],
  position: 1,
  ownLength: 620,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/otherwhere-iv-nala"],
  stepStatus: "step-status/recorders",
  lore: ["lore/otherwhere-iv-nala", "place/otherwhere-iv-willow-bend"],
  endsAt: "2026-09-28T05:40:00.000Z",
} as const satisfies StoryTurnPlayed
