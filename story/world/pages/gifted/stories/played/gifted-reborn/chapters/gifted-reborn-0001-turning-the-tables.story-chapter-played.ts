import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const giftedReborn0001TurningTheTables = {
  id: "01a17fd1-1208-7467-b95c-c1f3f4ede75a",
  type: "page-type/story-chapter-played",
  slug: "gifted-reborn-0001-turning-the-tables",
  position: 1,
  unit: "unit/words",
  title: "Turning the Tables",
  story: "story-played/gifted-reborn",
  ownLength: 558,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [
    { position: 1, paragraph: 0 },
    { position: 2, paragraph: 9 },
  ],
  lastTurn: "gifted-reborn-00-002",
  lastTurnPosition: 2,
  endsAt: "2026-10-27T20:40:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-28T00:02:50.503Z",
  updatedAt: "2026-10-28T00:02:50.503Z",
} as const satisfies StoryChapterPlayed
