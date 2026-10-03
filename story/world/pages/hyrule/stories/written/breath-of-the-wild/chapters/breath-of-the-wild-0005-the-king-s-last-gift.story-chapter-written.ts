import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const breathOfTheWild0005TheKingSLastGift = {
  id: "01a064b4-9ec8-7864-8434-774f6b603c27",
  type: "page-type/story-chapter-written",
  slug: "breath-of-the-wild-0005-the-king-s-last-gift",
  title: "The King's Last Gift",
  story: "story-written/breath-of-the-wild",
  position: 5,
  ownLength: 5312,
  unit: "unit/words",
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  characters: [
    "character-other/breath-of-the-wild-link",
    "character-other/breath-of-the-wild-rhoam",
  ],
} as const satisfies StoryChapterWritten
