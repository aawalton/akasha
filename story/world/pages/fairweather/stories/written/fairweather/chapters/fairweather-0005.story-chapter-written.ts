import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0005 = {
  id: "01a1062d-8d3d-744f-9e75-1eae3e476e13",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0005",
  position: 5,
  unit: "unit/words",
  title: "Chapter 5",
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
    "place/fairweather-glasswood",
    "place/fairweather-guild-hall",
    "place/fairweather-honeycomb",
    "place/fairweather-lanternmere",
    "place/fairweather-underbloom",
  ],
  recordedBy: ["story-recorder/plan", "story-recorder/inventory"],
} as const satisfies StoryChapterWritten
