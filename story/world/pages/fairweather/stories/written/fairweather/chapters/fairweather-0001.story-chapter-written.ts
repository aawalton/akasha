import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0001 = {
  id: "01a102a0-254d-78bc-af8f-82a070b940ba",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0001",
  position: 1,
  unit: "unit/words",
  title: "Chapter 1",
  story: "story-written/fairweather",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
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
} as const satisfies StoryChapterWritten
