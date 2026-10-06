import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0004 = {
  id: "01a1137d-b233-7fb8-99ca-d8d744203740",
  type: "page-type/story-chapter-written",
  slug: "encounters-0004",
  position: 4,
  unit: "unit/words",
  title: "Chapter 4",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: ["lore/encounters-hana", "lore/encounters-priya", "place/encounters-royal-pacific-room"],
} as const satisfies StoryChapterWritten
