import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const hollowmere0016 = {
  id: "01a0fef5-86f3-7edc-97c4-f6439ff07560",
  type: "page-type/story-chapter-written",
  slug: "hollowmere-0016",
  position: 16,
  unit: "unit/words",
  title: "Chapter 16",
  story: "story-written/hollowmere",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/hollowmere-academy-2",
    "lore/hollowmere-amara",
    "lore/hollowmere-kit",
    "lore/hollowmere-kit-2",
  ],
} as const satisfies StoryChapterWritten
