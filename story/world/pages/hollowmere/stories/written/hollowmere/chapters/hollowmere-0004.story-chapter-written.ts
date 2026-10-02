import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const hollowmere0004 = {
  id: "01a0fd96-b034-7b7c-8a05-416f56e7e0d3",
  type: "page-type/story-chapter-written",
  slug: "hollowmere-0004",
  position: 4,
  unit: "unit/words",
  title: "Chapter 4",
  story: "story-written/hollowmere",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/hollowmere-nala",
    "lore/hollowmere-world",
    "place/hollowmere-academy",
    "place/hollowmere-thornfield-house",
  ],
} as const satisfies StoryChapterWritten
