import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0001 = {
  id: "01a10386-8ea5-7c7f-9c42-44aad51ed4f6",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0001",
  position: 1,
  unit: "unit/words",
  title: "Chapter 1",
  story: "story-written/fairweather",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  beats: "jsonl",
  mechanicsIssues: "txt",
  mechanicsSentBack: true,
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
  recordedBy: ["story-recorder/plan", "story-recorder/mechanics", "story-recorder/inventory"],
} as const satisfies StoryChapterWritten
