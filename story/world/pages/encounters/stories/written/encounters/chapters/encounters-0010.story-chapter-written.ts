import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0010 = {
  id: "01a113e8-27ac-7b8e-8b82-5bfb189fe2d6",
  type: "page-type/story-chapter-written",
  slug: "encounters-0010",
  position: 10,
  unit: "unit/words",
  title: "Chapter 10",
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
    "place/encounters-cabana-bay-room-2",
  ],
  recordedBy: ["story-recorder/mechanics", "story-recorder/plan"],
} as const satisfies StoryChapterWritten
