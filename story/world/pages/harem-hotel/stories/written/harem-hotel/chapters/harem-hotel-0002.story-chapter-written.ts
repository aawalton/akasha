import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const haremHotel0002 = {
  id: "01a0eb67-e6e2-74d1-a371-ece696437939",
  type: "page-type/story-chapter-written",
  slug: "harem-hotel-0002",
  position: 2,
  unit: "unit/words",
  title: "Chapter 2",
  story: "story-written/harem-hotel",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: ["lore/harem-hotel-odile", "lore/harem-hotel-wren", "place/harem-hotel-floor-2"],
} as const satisfies StoryChapterWritten
