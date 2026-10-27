import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const testStory0001TheSquareAndTheHall = {
  id: "01a17ec9-0e87-79a4-b56e-f4b25dc133f5",
  type: "page-type/story-chapter-played",
  slug: "test-story-0001-the-square-and-the-hall",
  position: 1,
  unit: "unit/words",
  title: "The Square and the Hall",
  story: "story-played/test-story",
  ownLength: 145,
  prose: "txt",
  beats: "jsonl",
  lastTurn: "test-story-00-002",
  lastTurnPosition: 2,
  endsAt: "2026-10-27T08:15:00.000Z",
  createdAt: "2026-10-27T19:14:28.102Z",
  updatedAt: "2026-10-27T19:14:28.102Z",
} as const satisfies StoryChapterPlayed
