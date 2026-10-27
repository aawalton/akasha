import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const beatFlowTest00001 = {
  id: "01a17f86-8380-71b1-bfe3-6614783807bd",
  type: "page-type/story-turn-played",
  slug: "beat-flow-test-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/beat-flow-test"],
  position: 1,
  stepStatus: "step-status/beats",
  action: "I uncork one healing draught and drink it, then look around the square.",
  beats: "jsonl",
  lore: ["lore/test-world-overview"],
  createdAt: "2026-10-27T22:41:24.351Z",
  updatedAt: "2026-10-27T22:44:54.696Z",
  endsAt: "2026-11-06T09:35:00.000Z",
} as const satisfies StoryTurnPlayed
