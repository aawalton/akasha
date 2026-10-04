import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0001 = {
  id: "01a10457-5586-79ea-9338-e12f21d6f53e",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0001",
  position: 1,
  unit: "unit/words",
  title: "Chapter 1",
  story: "story-written/fairweather",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/writer",
  beats: "jsonl",
  lore: [
    "lore/fairweather-cora",
    "lore/fairweather-elsie",
    "lore/fairweather-tamsin",
    "lore/fairweather-tilly",
    "lore/fairweather-world",
    "place/fairweather-guild-hall",
    "place/fairweather-hall-of-naming",
    "place/fairweather-honeycomb",
    "place/fairweather-lanternmere",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/plan", "story-recorder/mechanics"],
} as const satisfies StoryChapterWritten
