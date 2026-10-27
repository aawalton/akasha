import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00005 = {
  id: "01a17ee7-719d-72eb-b6c5-a73eb1ad559f",
  type: "page-type/story-turn-played",
  slug: "test-story-00-005",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 5,
  stepStatus: "step-status/writer",
  action: "I use Healing Draught",
  beats: "jsonl",
  recordedBy: ["story-recorder/inventory", "story-recorder/plan", "story-recorder/mechanics"],
  endsAt: "2026-10-27T08:37:00.000Z",
  createdAt: "2026-10-27T19:47:39.549Z",
  updatedAt: "2026-10-27T19:59:24.657Z",
} as const satisfies StoryTurnPlayed
