import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const giftedPolish0001TurningTheTables = {
  id: "01a18e17-127d-7c4e-b23c-4c30e5d190b5",
  type: "page-type/story-chapter-played",
  slug: "gifted-polish-0001-turning-the-tables",
  position: 1,
  unit: "unit/words",
  title: "Turning the Tables",
  story: "story-played/gifted-polish",
  ownLength: 558,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [
    { position: 1, paragraph: 0 },
    { position: 2, paragraph: 9 },
  ],
  lastTurn: "gifted-polish-00-002",
  lastTurnPosition: 2,
  endsAt: "2026-10-27T20:40:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies StoryChapterPlayed
