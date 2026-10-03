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
  stepStatus: "step-status/world-builder",
} as const satisfies StoryChapterWritten
