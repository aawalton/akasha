import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00009 = {
  id: "01a17f30-ed2b-7df3-9d84-989ca7d7d108",
  type: "page-type/story-turn-played",
  slug: "test-story-00-009",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 9,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/beats",
  action: "For each of the next 10 days I drill swordplay in the hall, from morning to evening.",
  beats: "jsonl",
  lore: ["place/test-world-hall"],
  reviewedBy: ["story-reviewer/continuity", "story-reviewer/scene", "story-reviewer/style"],
  createdAt: "2026-10-27T21:07:55.307Z",
  updatedAt: "2026-10-27T21:39:27.883Z",
  ownLength: 148,
  endsAt: "2026-11-06T08:44:00.000Z",
} as const satisfies StoryTurnPlayed
