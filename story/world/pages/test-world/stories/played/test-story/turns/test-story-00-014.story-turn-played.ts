import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00014 = {
  id: "01a18026-5a2c-7c75-9526-5936d5b318f6",
  type: "page-type/story-turn-played",
  slug: "test-story-00-014",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 14,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/beats",
  action: "I look over the lamps on the shelf.",
  beats: "jsonl",
  reviewedBy: ["story-reviewer/holdings", "story-reviewer/scene", "story-reviewer/continuity"],
  endsAt: "2026-11-13T12:02:00.000Z",
  createdAt: "2026-10-28T01:35:59.532Z",
  updatedAt: "2026-10-28T01:42:11.655Z",
  ownLength: 63,
} as const satisfies StoryTurnPlayed
