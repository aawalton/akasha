import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const giftedTrial20001TurningTheTables = {
  id: "01a18dab-06cd-70d2-af24-41c7b723dc8c",
  type: "page-type/story-chapter-played",
  slug: "gifted-trial2-0001-turning-the-tables",
  position: 1,
  unit: "unit/words",
  title: "Turning the Tables",
  story: "story-played/gifted-trial2",
  ownLength: 558,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [
    { position: 1, paragraph: 0 },
    { position: 2, paragraph: 9 },
  ],
  lastTurn: "gifted-trial2-00-002",
  lastTurnPosition: 2,
  endsAt: "2026-10-27T20:40:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies StoryChapterPlayed
