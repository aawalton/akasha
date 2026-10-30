import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const giftedPolish0002StatusAndSums = {
  id: "01a18e17-127d-7a71-a299-304645b5a359",
  type: "page-type/story-chapter-played",
  slug: "gifted-polish-0002-status-and-sums",
  position: 2,
  unit: "unit/words",
  title: "Status and Sums",
  story: "story-played/gifted-polish",
  ownLength: 780,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [
    { position: 3, paragraph: 0 },
    { position: 4, paragraph: 5 },
    { position: 5, paragraph: 13 },
  ],
  lastTurn: "gifted-polish-00-005",
  lastTurnPosition: 5,
  endsAt: "2026-10-28T09:00:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies StoryChapterPlayed
