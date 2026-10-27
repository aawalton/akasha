import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00011 = {
  id: "01a17fad-6204-750a-b2ce-c3851a70df64",
  type: "page-type/story-turn-played",
  slug: "test-story-00-011",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 11,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/player",
  action: "For each of the next 5 days I drill swordplay in the hall, from morning to evening.",
  beats: "jsonl",
  lore: ["lore/test-world-overview", "place/test-world-hall"],
  reviewedBy: [
    "story-reviewer/scene",
    "story-reviewer/continuity",
    "story-reviewer/holdings",
    "story-reviewer/style",
  ],
  createdAt: "2026-10-27T23:23:51.683Z",
  updatedAt: "2026-10-27T23:34:16.841Z",
  ownLength: 78,
  endsAt: "2026-11-08T09:30:00.000Z",
} as const satisfies StoryTurnPlayed
