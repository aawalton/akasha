import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const theBeholder001SomethingBorrowed = {
  id: "01a06599-c380-72e5-b406-7f61665724fa",
  type: "page-type/story-chapter-written",
  slug: "the-beholder-001-something-borrowed",
  title: "Something Borrowed",
  story: "story-written/the-beholder",
  position: 1,
  ownLength: 2726,
  unit: "unit/words",
  prose: "txt",
} as const satisfies StoryChapterWritten
