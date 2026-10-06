import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0005 = {
  id: "01a1138b-a8ec-79cc-bb41-99dd7f946f6c",
  type: "page-type/story-chapter-written",
  slug: "encounters-0005",
  position: 5,
  unit: "unit/words",
  title: "Chapter 5",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/mechanics",
  beats: "jsonl",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-kenzie",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "lore/encounters-sofia-3",
    "place/encounters-cabana-bay-room",
  ],
} as const satisfies StoryChapterWritten
