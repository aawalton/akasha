import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0008 = {
  id: "01a113c4-38ad-7d50-9a45-e7faa997d69d",
  type: "page-type/story-chapter-written",
  slug: "encounters-0008",
  position: 8,
  unit: "unit/words",
  title: "Chapter 8",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/mechanics",
  beats: "jsonl",
  lore: [
    "lore/encounters-priya",
    "lore/encounters-priya-2",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "lore/encounters-sofia-3",
    "place/encounters-cabana-bay-room",
  ],
} as const satisfies StoryChapterWritten
