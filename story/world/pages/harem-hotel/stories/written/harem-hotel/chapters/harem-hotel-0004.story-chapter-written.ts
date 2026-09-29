import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const haremHotel0004 = {
  id: "01a0ef24-cbe9-734a-aa6e-24a8b55965c5",
  type: "page-type/story-chapter-written",
  slug: "harem-hotel-0004",
  position: 4,
  unit: "unit/words",
  title: "Chapter 4",
  story: "story-written/harem-hotel",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/harem-hotel-odile",
    "lore/harem-hotel-tamsin",
    "lore/harem-hotel-wren",
    "place/harem-hotel-floor-4",
  ],
} as const satisfies StoryChapterWritten
