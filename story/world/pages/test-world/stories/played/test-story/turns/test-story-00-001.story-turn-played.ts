import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00001 = {
  id: "01a17ec8-ef11-7688-8401-dede6790add8",
  type: "page-type/story-turn-played",
  slug: "test-story-00-001",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 1,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/player",
  action: "I look around the square.",
  beats: "jsonl",
  lore: ["lore/test-world-overview", "place/test-world-square"],
  endsAt: "2026-10-27T08:05:00.000Z",
  createdAt: "2026-10-27T19:14:20.048Z",
  updatedAt: "2026-10-27T19:14:20.048Z",
} as const satisfies StoryTurnPlayed
