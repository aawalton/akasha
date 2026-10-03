import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const breathOfTheWild0004TheWeightOfCold = {
  id: "01a064b4-9ec8-7dbf-acb2-93f3f8dca8a2",
  type: "page-type/story-chapter-written",
  slug: "breath-of-the-wild-0004-the-weight-of-cold",
  title: "The Weight of Cold",
  story: "story-written/breath-of-the-wild",
  position: 4,
  ownLength: 4464,
  unit: "unit/words",
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  characters: [
    "character-other/breath-of-the-wild-link",
    "character-other/breath-of-the-wild-rhoam",
  ],
} as const satisfies StoryChapterWritten
