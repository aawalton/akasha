import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0001 = {
  id: "01a10386-8ea5-7c7f-9c42-44aad51ed4f6",
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
