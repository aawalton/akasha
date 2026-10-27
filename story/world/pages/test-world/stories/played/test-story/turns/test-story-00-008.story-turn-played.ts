import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const testStory00008 = {
  id: "01a17f27-d626-757d-b021-556086161452",
  type: "page-type/story-turn-played",
  slug: "test-story-00-008",
  unit: "unit/words",
  partOfCollections: ["story-played/test-story"],
  position: 8,
  stepStatus: "step-status/beats",
  action:
    "I draw my sword and try to slice the lantern's taper in half in one stroke without putting out its flame.",
  beats: "jsonl",
  endsAt: "2026-10-27T08:44:00.000Z",
  createdAt: "2026-10-27T20:57:59.590Z",
  updatedAt: "2026-10-27T20:59:57.986Z",
} as const satisfies StoryTurnPlayed
