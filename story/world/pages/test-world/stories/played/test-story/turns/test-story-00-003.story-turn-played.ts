import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00003 = {
  id: "01a17ec8-ef11-7d20-956c-4fac52512691",
  type: "page-type/story-turn-played",
  slug: "test-story-00-003",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 3,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/player",
  action: "I go back down to the square and into the shop.",
  beats: "jsonl",
  lore: ["lore/test-world-folk", "place/test-world-shop"],
  endsAt: "2026-10-27T08:30:00.000Z",
  createdAt: "2026-10-27T19:14:20.048Z",
  updatedAt: "2026-10-27T19:14:20.048Z",
} as const satisfies StoryTurnPlayed
