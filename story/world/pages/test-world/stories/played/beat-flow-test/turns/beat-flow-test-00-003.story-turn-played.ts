import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const beatFlowTest00003 = {
  id: "01a17fa2-1796-71cb-a0e6-671cb8c6f62b",
  type: "page-type/story-turn-played",
  slug: "beat-flow-test-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/beat-flow-test"],
  position: 3,
  prose: "txt",
  characters: ["character-player/beat-flow-test-player"],
  stepStatus: "step-status/beats",
  action: "I sit down on the bench beside the well and rest for a moment.",
  beats: "jsonl",
  lore: ["lore/test-world-folk", "lore/test-world-overview", "place/test-world-hall"],
  createdAt: "2026-10-27T23:11:31.734Z",
  updatedAt: "2026-10-28T00:33:53.354Z",
  ownLength: 25,
  endsAt: "2026-11-06T09:42:00.000Z",
} as const satisfies StoryTurnPlayed
