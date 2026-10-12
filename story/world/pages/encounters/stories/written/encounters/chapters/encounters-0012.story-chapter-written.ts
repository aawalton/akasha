import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0012 = {
  id: "01a1303b-a29a-75f0-8bde-e8576f94531f",
  type: "page-type/story-chapter-written",
  slug: "encounters-0012",
  position: 12,
  unit: "unit/words",
  title: "Chapter 12",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/mechanics",
  beats: "jsonl",
  lore: ["lore/encounters-callie", "place/encounters-brooks-farm"],
  recordedBy: ["story-recorder/inventory"],
  createdAt: "2026-10-12T13:09:37.049Z",
  updatedAt: "2026-10-12T13:16:33.124Z",
} as const satisfies StoryChapterWritten
