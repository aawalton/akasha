import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0003 = {
  id: "01a10495-c84d-7662-a68d-14e4c5718f9d",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0003",
  position: 3,
  unit: "unit/words",
  title: "Chapter 3",
  story: "story-written/fairweather",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  beats: "jsonl",
  mechanicsIssues: "txt",
  lore: [
    "lore/fairweather-cora",
    "lore/fairweather-elsie",
    "lore/fairweather-tamsin",
    "lore/fairweather-tilly",
    "lore/fairweather-world",
    "place/fairweather-guild-hall",
    "place/fairweather-honeycomb",
    "place/fairweather-lanternmere",
    "place/fairweather-underbloom",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/plan", "story-recorder/mechanics"],
} as const satisfies StoryChapterWritten
