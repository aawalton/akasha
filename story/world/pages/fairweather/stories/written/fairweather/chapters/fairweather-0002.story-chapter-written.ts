import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0002 = {
  id: "01a1047a-4936-79ff-b6a2-84bbb8667f63",
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
  mechanicsIssues: "txt",
  lore: [
    "lore/fairweather-cora",
    "lore/fairweather-elsie",
    "lore/fairweather-tamsin",
    "lore/fairweather-tilly",
    "lore/fairweather-world",
    "place/fairweather-crooked-kettle",
    "place/fairweather-guild-hall",
    "place/fairweather-honeycomb",
    "place/fairweather-lanternmere",
  ],
  recordedBy: ["story-recorder/inventory"],
} as const satisfies StoryChapterWritten
