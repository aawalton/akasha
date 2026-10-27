import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const testStory0004TheCutAndTheRung = {
  id: "01a17fc0-3d47-799c-bcca-a64eecf74517",
  type: "page-type/story-chapter-played",
  slug: "test-story-0004-the-cut-and-the-rung",
  position: 4,
  unit: "unit/words",
  title: "The Cut and the Rung",
  story: "story-played/test-story",
  ownLength: 269,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [
    { position: 10, paragraph: 0 },
    { position: 11, paragraph: 3 },
    { position: 12, paragraph: 6 },
  ],
  lastTurn: "test-story-00-012",
  lastTurnPosition: 12,
  endsAt: "2026-11-11T09:30:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-27T23:44:27.463Z",
  updatedAt: "2026-10-27T23:44:27.463Z",
} as const satisfies StoryChapterPlayed
