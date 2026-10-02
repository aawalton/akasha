import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const emberdeep0004 = {
  id: "01a0fe70-ebea-7333-a55e-a8f950c9bda6",
  type: "page-type/story-chapter-written",
  slug: "emberdeep-0004",
  position: 4,
  unit: "unit/words",
  title: "Chapter 4",
  story: "story-written/emberdeep",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/emberdeep-elowen",
    "lore/emberdeep-wren",
    "place/emberdeep-corbel-house",
    "place/emberdeep-town",
  ],
} as const satisfies StoryChapterWritten
