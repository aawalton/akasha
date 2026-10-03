import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0002 = {
  id: "01a10321-bcc2-7558-8635-6024a69d1645",
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
  mechanicsSentBack: true,
  lore: [
    "lore/fairweather-cora",
    "lore/fairweather-elsie",
    "lore/fairweather-tamsin",
    "lore/fairweather-tilly",
    "lore/fairweather-world",
    "place/fairweather-glasswood",
    "place/fairweather-guild-hall",
    "place/fairweather-honeycomb",
  ],
  recordedBy: ["story-recorder/inventory"],
} as const satisfies StoryChapterWritten
