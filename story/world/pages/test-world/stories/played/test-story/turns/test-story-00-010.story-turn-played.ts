import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00010 = {
  id: "01a17f62-f720-7213-9210-560fa502059c",
  type: "page-type/story-turn-played",
  slug: "test-story-00-010",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 10,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/player",
  action: "I wait by the hearth a while.",
  beats: "jsonl",
  lore: ["place/test-world-hall"],
  reviewedBy: [
    "story-reviewer/scene",
    "story-reviewer/holdings",
    "story-reviewer/continuity",
    "story-reviewer/style",
  ],
  endsAt: "2026-11-06T09:30:00.000Z",
  createdAt: "2026-10-27T22:02:34.656Z",
  updatedAt: "2026-10-27T22:09:35.631Z",
  ownLength: 83,
} as const satisfies StoryTurnPlayed
