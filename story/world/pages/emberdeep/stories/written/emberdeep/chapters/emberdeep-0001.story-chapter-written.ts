import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const emberdeep0001 = {
  id: "01a0fdaf-d41a-7d81-bed4-00a6f159b266",
  type: "page-type/story-chapter-written",
  slug: "emberdeep-0001",
  position: 1,
  unit: "unit/words",
  title: "Chapter 1",
  story: "story-written/emberdeep",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/emberdeep-elowen",
    "lore/emberdeep-nala",
    "lore/emberdeep-world",
    "lore/emberdeep-wren",
    "place/emberdeep-corbel-house",
    "place/emberdeep-guild-hall",
    "place/emberdeep-town",
  ],
} as const satisfies StoryChapterWritten
