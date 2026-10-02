import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const hollowmere0001 = {
  id: "01a0fd10-48e5-7ba5-86f5-dd3b87362612",
  type: "page-type/story-chapter-written",
  slug: "hollowmere-0001",
  position: 1,
  unit: "unit/words",
  title: "Chapter 1",
  story: "story-written/hollowmere",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/hollowmere-bea",
    "lore/hollowmere-kit",
    "lore/hollowmere-nala",
    "lore/hollowmere-world",
    "lore/hollowmere-yusra",
    "place/hollowmere-academy",
    "place/hollowmere-thornfield-house",
  ],
} as const satisfies StoryChapterWritten
