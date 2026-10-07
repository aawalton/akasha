import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0009 = {
  id: "01a113d6-5a8d-7d85-aa44-3d4a656a8a5c",
  type: "page-type/story-chapter-written",
  slug: "encounters-0009",
  position: 9,
  unit: "unit/words",
  title: "Chapter 9",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/writer",
  beats: "jsonl",
  lore: [
    "lore/encounters-kenzie",
    "lore/encounters-kenzie-2",
    "lore/encounters-priya",
    "lore/encounters-priya-2",
    "place/encounters-royal-pacific-room",
  ],
  recordedBy: ["story-recorder/mechanics", "story-recorder/plan", "story-recorder/inventory"],
} as const satisfies StoryChapterWritten
