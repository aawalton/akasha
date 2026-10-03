import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const hollowmere0033 = {
  id: "01a1021d-8de6-70cf-aff1-59834d42f60b",
  type: "page-type/story-chapter-written",
  slug: "hollowmere-0033",
  position: 33,
  unit: "unit/words",
  title: "Chapter 33",
  story: "story-written/hollowmere",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/hollowmere-kit",
    "lore/hollowmere-kit-2",
    "lore/hollowmere-kit-3",
    "place/hollowmere-kendal",
  ],
} as const satisfies StoryChapterWritten
