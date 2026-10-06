import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0002 = {
  id: "01a11357-05b9-7e6d-bf3c-a870ec1b5225",
  type: "page-type/story-chapter-written",
  slug: "encounters-0002",
  position: 2,
  unit: "unit/words",
  title: "Chapter 2",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  lore: [
    "lore/encounters-kenzie",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "place/encounters-royal-pacific-lounge",
    "place/encounters-royal-pacific-room",
  ],
} as const satisfies StoryChapterWritten
