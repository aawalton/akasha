import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0001 = {
  id: "01a11326-b2fe-7f73-bf32-2712ffab83c2",
  type: "page-type/story-chapter-written",
  slug: "encounters-0001",
  position: 1,
  unit: "unit/words",
  title: "Chapter 1",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-kenzie",
    "lore/encounters-priya",
    "lore/encounters-sofia",
  ],
} as const satisfies StoryChapterWritten
