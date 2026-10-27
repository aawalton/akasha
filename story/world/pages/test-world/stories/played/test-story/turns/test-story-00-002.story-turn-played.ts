import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00002 = {
  id: "01a17ec8-ef11-7fc7-81ff-4da973ecf91a",
  type: "page-type/story-turn-played",
  slug: "test-story-00-002",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 2,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/player",
  action: "I climb the steps and go into the hall.",
  beats: "jsonl",
  lore: ["lore/test-world-overview", "place/test-world-hall"],
  endsAt: "2026-10-27T08:15:00.000Z",
  createdAt: "2026-10-27T19:14:20.048Z",
  updatedAt: "2026-10-27T19:14:20.048Z",
} as const satisfies StoryTurnPlayed
