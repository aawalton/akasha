import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const undoCheck00001 = {
  id: "01a1830a-a4b4-79ca-90d9-be680ae411c6",
  type: "page-type/story-turn-played",
  slug: "undo-check-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/undo-check"],
  position: 1,
  stepStatus: "step-status/beats",
  action: "I buy a lantern.",
  beats: "jsonl",
  createdAt: "2026-10-28T15:04:35.251Z",
  updatedAt: "2026-10-28T15:04:35.251Z",
} as const satisfies StoryTurnPlayed
