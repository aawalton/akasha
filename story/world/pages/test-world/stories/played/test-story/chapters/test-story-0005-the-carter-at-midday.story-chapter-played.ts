import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const testStory0005TheCarterAtMidday = {
  id: "01a17fcf-1418-7ada-9b69-b04e26dc3e97",
  type: "page-type/story-chapter-played",
  slug: "test-story-0005-the-carter-at-midday",
  position: 5,
  unit: "unit/words",
  title: "The Carter at Midday",
  story: "story-played/test-story",
  ownLength: 147,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [{ position: 13, paragraph: 0 }],
  lastTurn: "test-story-00-013",
  lastTurnPosition: 13,
  endsAt: "2026-11-13T12:00:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-28T00:00:39.959Z",
  updatedAt: "2026-10-28T16:45:33.820Z",
  ownProgress: 120,
  progressedAt: "2026-10-28T16:45:33.820Z",
} as const satisfies StoryChapterPlayed
