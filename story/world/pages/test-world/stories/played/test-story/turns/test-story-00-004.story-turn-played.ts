import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00004 = {
  id: "01a17ec8-ef11-744c-9952-a9601cabe717",
  type: "page-type/story-turn-played",
  slug: "test-story-00-004",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 4,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/player",
  action: "I ask her what the brass token in my pocket is for.",
  beats: "jsonl",
  lore: ["lore/test-world-folk", "place/test-world-shop"],
  endsAt: "2026-10-27T08:35:00.000Z",
  createdAt: "2026-10-27T19:14:20.048Z",
  updatedAt: "2026-10-27T19:14:20.048Z",
} as const satisfies StoryTurnPlayed
