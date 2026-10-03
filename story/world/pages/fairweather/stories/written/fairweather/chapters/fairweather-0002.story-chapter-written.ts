import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0002 = {
  id: "01a103f7-927d-775c-9eb2-1f5733dcf26a",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0002",
  position: 2,
  unit: "unit/words",
  title: "Chapter 2",
  story: "story-written/fairweather",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/mechanics",
  beats: "jsonl",
  lore: [
    "lore/fairweather-cora",
    "lore/fairweather-elsie",
    "lore/fairweather-tamsin",
    "lore/fairweather-tilly",
    "lore/fairweather-world",
    "place/fairweather-glasswood",
    "place/fairweather-guild-hall",
    "place/fairweather-honeycomb",
    "place/fairweather-lanternmere",
  ],
} as const satisfies StoryChapterWritten
