import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const testStory0002TheShopAndTheTaper = {
  id: "01a17f2f-c0dd-7e88-a4ff-2bd62fc7cc3c",
  type: "page-type/story-chapter-played",
  slug: "test-story-0002-the-shop-and-the-taper",
  position: 2,
  unit: "unit/words",
  title: "The Shop and the Taper",
  story: "story-played/test-story",
  ownLength: 477,
  prose: "txt",
  beats: "jsonl",
  lastTurn: "test-story-00-008",
  lastTurnPosition: 8,
  endsAt: "2026-10-27T08:44:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-27T21:06:38.428Z",
  updatedAt: "2026-10-27T21:06:38.428Z",
} as const satisfies StoryChapterPlayed
