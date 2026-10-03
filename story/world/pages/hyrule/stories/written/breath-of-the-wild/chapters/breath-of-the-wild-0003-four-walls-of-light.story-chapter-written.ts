import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const breathOfTheWild0003FourWallsOfLight = {
  id: "01a064b4-9ec8-7d2a-b8c0-2cdd50069f4a",
  type: "page-type/story-chapter-written",
  slug: "breath-of-the-wild-0003-four-walls-of-light",
  title: "Four Walls of Light",
  story: "story-written/breath-of-the-wild",
  position: 3,
  ownLength: 4605,
  unit: "unit/words",
  prose: "txt",
  stepStatus: "step-status/player",
  beats: "jsonl",
  characters: [
    "character-other/breath-of-the-wild-link",
    "character-other/breath-of-the-wild-rhoam",
  ],
} as const satisfies StoryChapterWritten
