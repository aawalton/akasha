import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const testStory0003TenDaysInTheHall = {
  id: "01a17f4e-99a3-713b-82d3-08291e64c7da",
  type: "page-type/story-chapter-played",
  slug: "test-story-0003-ten-days-in-the-hall",
  position: 3,
  unit: "unit/words",
  title: "Ten Days in the Hall",
  story: "story-played/test-story",
  ownLength: 148,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [{ position: 9, paragraph: 0 }],
  lastTurn: "test-story-00-009",
  lastTurnPosition: 9,
  endsAt: "2026-11-06T08:44:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-27T21:40:20.002Z",
  updatedAt: "2026-10-27T21:40:20.002Z",
} as const satisfies StoryChapterPlayed
