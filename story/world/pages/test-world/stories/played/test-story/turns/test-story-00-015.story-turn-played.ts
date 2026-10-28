import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00015 = {
  id: "01a18029-aabd-7852-bd4c-769b15a93337",
  type: "page-type/story-turn-played",
  slug: "test-story-00-015",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 15,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/beats",
  action: "I nod to the shopkeeper.\n\nI check my purse.",
  beats: "jsonl",
  endsAt: "2026-11-13T12:04:00.000Z",
  createdAt: "2026-10-28T01:39:36.765Z",
  updatedAt: "2026-10-28T01:44:25.064Z",
  ownLength: 19,
} as const satisfies StoryTurnPlayed
