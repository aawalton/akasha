import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0004 = {
  id: "01a10616-4fa4-7353-a73b-495274ab98d5",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0004",
  position: 4,
  unit: "unit/words",
  title: "Chapter 4",
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
    "place/fairweather-underbloom",
  ],
  recordedBy: ["story-recorder/plan", "story-recorder/inventory"],
  rulings: "jsonl",
} as const satisfies StoryChapterWritten
