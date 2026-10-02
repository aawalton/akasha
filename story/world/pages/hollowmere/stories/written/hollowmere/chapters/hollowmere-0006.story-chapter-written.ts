import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const hollowmere0006 = {
  id: "01a0fdf3-2a3b-70df-85ff-abe7cbd20b6b",
  type: "page-type/story-chapter-written",
  slug: "hollowmere-0006",
  position: 6,
  unit: "unit/words",
  title: "Chapter 6",
  story: "story-written/hollowmere",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: ["lore/hollowmere-nala", "place/hollowmere-academy", "place/hollowmere-kendal"],
} as const satisfies StoryChapterWritten
