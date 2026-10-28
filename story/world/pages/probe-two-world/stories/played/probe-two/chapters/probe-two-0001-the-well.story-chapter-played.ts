import type { StoryChapterPlayed } from "akasha/story/world/stories/played/chapters/story-chapter-played.page-type.types.ts"

export const probeTwo0001TheWell = {
  id: "01a17fd4-3efa-7fbc-8d47-2ddd438b0621",
  type: "page-type/story-chapter-played",
  slug: "probe-two-0001-the-well",
  position: 1,
  unit: "unit/words",
  title: "The Well",
  story: "story-played/probe-two",
  ownLength: 235,
  prose: "txt",
  beats: "jsonl",
  turnStarts: [{ position: 1, paragraph: 0 }],
  lastTurn: "probe-two-00-001",
  lastTurnPosition: 1,
  endsAt: "2026-11-11T09:32:00.000Z",
  outcomes: "jsonl",
  createdAt: "2026-10-28T00:06:18.618Z",
  updatedAt: "2026-10-28T00:06:18.618Z",
} as const satisfies StoryChapterPlayed
