import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const breathOfTheWild0001OpenYourEyes = {
  id: "01a064b4-9ec8-7699-b616-c47d778e7d7b",
  type: "page-type/story-chapter-written",
  slug: "breath-of-the-wild-0001-open-your-eyes",
  title: "Open Your Eyes",
  story: "story-written/breath-of-the-wild",
  position: 1,
  ownLength: 4943,
  unit: "unit/words",
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  characters: [
    "character-other/breath-of-the-wild-link",
    "character-other/breath-of-the-wild-rhoam",
  ],
} as const satisfies StoryChapterWritten
