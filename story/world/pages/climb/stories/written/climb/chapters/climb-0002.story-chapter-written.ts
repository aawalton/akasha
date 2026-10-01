import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const climb0002 = {
  id: "01a0f967-938d-7cba-8728-a9ee1f63f84b",
  type: "page-type/story-chapter-written",
  slug: "climb-0002",
  position: 2,
  unit: "unit/words",
  title: "Chapter 2",
  story: "story-written/climb",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: ["lore/climb-mina", "place/climb-floor-2"],
} as const satisfies StoryChapterWritten
