import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const giftedTrial20002StatusAndSums = {
  id: "01a18dab-06cd-7f39-a5ec-691a8a80cd98",
  type: "page-type/story-chapter-played",
  slug: "gifted-trial2-0002-status-and-sums",
  position: 2,
  unit: "unit/words",
  title: "Status and Sums",
  story: "story-played/gifted-trial2",
  ownLength: 780,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [
    { position: 3, paragraph: 0 },
    { position: 4, paragraph: 5 },
    { position: 5, paragraph: 13 },
  ],
  lastTurn: "gifted-trial2-00-005",
  lastTurnPosition: 5,
  endsAt: "2026-10-28T09:00:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies StoryChapterPlayed
