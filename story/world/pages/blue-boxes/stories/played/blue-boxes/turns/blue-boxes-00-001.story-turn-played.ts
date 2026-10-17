import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const blueBoxes00001 = {
  id: "01a14b0f-4e5b-78e4-9f2c-73dfcd3f1404",
  type: "page-type/story-turn-played",
  slug: "blue-boxes-00-001",
  partOfCollections: ["story-played/blue-boxes"],
  position: 1,
  unit: "unit/words",
  prose: "txt",
  characters: ["character-player/blue-boxes-nala", "character-other/blue-boxes-iris"],
  stepStatus: "step-status/player",
  roleplayed: true,
  createdAt: "2026-10-17T18:10:56.730Z",
  updatedAt: "2026-10-17T18:10:56.730Z",
} as const satisfies StoryTurnPlayed
