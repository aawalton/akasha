import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0006 = {
  id: "01a1139b-e970-718c-8bd6-6e5ce94863ce",
  type: "page-type/story-chapter-written",
  slug: "encounters-0006",
  position: 6,
  unit: "unit/words",
  title: "Chapter 6",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/mechanics",
  beats: "jsonl",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-kenzie",
    "lore/encounters-kenzie-2",
    "lore/encounters-priya",
    "place/encounters-cabana-bay-room-2",
  ],
  recordedBy: ["story-recorder/plan", "story-recorder/inventory"],
} as const satisfies StoryChapterWritten
