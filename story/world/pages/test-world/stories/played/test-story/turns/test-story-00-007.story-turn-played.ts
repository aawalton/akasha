import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00007 = {
  id: "01a17f20-ca27-7a85-b6d3-61cf7494d3ac",
  type: "page-type/story-turn-played",
  slug: "test-story-00-007",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 7,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/beats",
  action: "I thank her, hold the lantern up, and ask what lies beyond the shop's back door.",
  beats: "jsonl",
  lore: ["place/test-world-cellar", "place/test-world-shop"],
  endsAt: "2026-10-27T08:42:00.000Z",
  createdAt: "2026-10-27T20:50:17.767Z",
  updatedAt: "2026-10-27T20:56:49.885Z",
  ownLength: 107,
} as const satisfies StoryTurnPlayed
