import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const giftedReborn0002StatusAndSums = {
  id: "01a1894f-4246-7a6b-aaf4-6c965040e7e4",
  type: "page-type/story-chapter-played",
  slug: "gifted-reborn-0002-status-and-sums",
  position: 2,
  unit: "unit/words",
  title: "Status and Sums",
  story: "story-played/gifted-reborn",
  ownLength: 780,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [
    { position: 3, paragraph: 0 },
    { position: 4, paragraph: 5 },
    { position: 5, paragraph: 13 },
  ],
  lastTurn: "gifted-reborn-00-005",
  lastTurnPosition: 5,
  endsAt: "2026-10-28T09:00:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-29T20:17:15.333Z",
  updatedAt: "2026-10-29T20:17:15.333Z",
} as const satisfies StoryChapterPlayed
