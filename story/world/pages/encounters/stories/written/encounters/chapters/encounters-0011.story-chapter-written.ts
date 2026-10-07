import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0011 = {
  id: "01a113f8-66e7-74a6-b855-7e9727eea621",
  type: "page-type/story-chapter-written",
  slug: "encounters-0011",
  position: 11,
  unit: "unit/words",
  title: "Chapter 11",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/mechanics",
  beats: "jsonl",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-hana-2",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "lore/encounters-sofia-3",
    "place/encounters-cabana-bay-room",
    "place/encounters-cabana-bay-room-2",
  ],
  recordedBy: ["story-recorder/mechanics", "story-recorder/inventory"],
} as const satisfies StoryChapterWritten
