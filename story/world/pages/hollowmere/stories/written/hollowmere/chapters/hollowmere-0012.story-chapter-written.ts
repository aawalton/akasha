import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const hollowmere0012 = {
  id: "01a0fe85-7bb9-7110-ae6b-c7ba4f14d6f0",
  type: "page-type/story-chapter-written",
  slug: "hollowmere-0012",
  position: 12,
  unit: "unit/words",
  title: "Chapter 12",
  story: "story-written/hollowmere",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: ["lore/hollowmere-penhallow", "place/hollowmere-kendal"],
} as const satisfies StoryChapterWritten
