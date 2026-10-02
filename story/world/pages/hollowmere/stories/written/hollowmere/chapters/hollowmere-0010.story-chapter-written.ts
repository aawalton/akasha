import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const hollowmere0010 = {
  id: "01a0fe5e-f4eb-77c5-91e0-c673b0283c82",
  type: "page-type/story-chapter-written",
  slug: "hollowmere-0010",
  position: 10,
  unit: "unit/words",
  title: "Chapter 10",
  story: "story-written/hollowmere",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: ["lore/hollowmere-academy-2", "place/hollowmere-academy"],
} as const satisfies StoryChapterWritten
