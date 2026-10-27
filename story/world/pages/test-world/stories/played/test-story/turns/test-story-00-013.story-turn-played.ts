import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00013 = {
  id: "01a17fc0-b6b2-7afc-a361-114fe735b998",
  type: "page-type/story-turn-played",
  slug: "test-story-00-013",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 13,
  prose: "txt",
  characters: ["character-player/test-story-player"],
  stepStatus: "step-status/beats",
  action:
    "For the next 7 days I drill swordplay in the hall from morning to evening, and stop if anyone comes asking for a hired sword.",
  beats: "jsonl",
  lore: ["lore/test-world-folk"],
  interruptsAt: "2026-11-13T12:00:00.000Z",
  createdAt: "2026-10-27T23:44:58.546Z",
  updatedAt: "2026-10-27T23:52:38.276Z",
  ownLength: 147,
  endsAt: "2026-11-13T12:00:00.000Z",
} as const satisfies StoryTurnPlayed
