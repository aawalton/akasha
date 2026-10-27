import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const beatFlowTest00002 = {
  id: "01a17f89-e61e-7802-96d4-3a8935f07e20",
  type: "page-type/story-turn-played",
  slug: "beat-flow-test-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/beat-flow-test"],
  position: 2,
  prose: "txt",
  characters: ["character-player/beat-flow-test-player"],
  stepStatus: "step-status/beats",
  action: "I walk over to the well in the middle of the square and look down into it.",
  beats: "jsonl",
  lore: ["lore/test-world-magic", "place/test-world-square"],
  createdAt: "2026-10-27T22:45:06.206Z",
  updatedAt: "2026-10-27T23:02:45.771Z",
  ownLength: 95,
  endsAt: "2026-11-06T09:37:00.000Z",
} as const satisfies StoryTurnPlayed
