import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const breathOfTheWild0002TheOldManOnTheHill = {
  id: "01a064b4-9ec8-7905-8460-f8a703c85ac5",
  type: "page-type/story-chapter-written",
  slug: "breath-of-the-wild-0002-the-old-man-on-the-hill",
  title: "The Old Man on the Hill",
  story: "story-written/breath-of-the-wild",
  position: 2,
  ownLength: 4569,
  unit: "unit/words",
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  characters: [
    "character-other/breath-of-the-wild-link",
    "character-other/breath-of-the-wild-rhoam",
  ],
} as const satisfies StoryChapterWritten
