import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0003 = {
  id: "01a11369-9481-77dc-967a-d4181eb52b37",
  type: "page-type/story-chapter-written",
  slug: "encounters-0003",
  position: 3,
  unit: "unit/words",
  title: "Chapter 3",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/mechanics",
  beats: "jsonl",
  lore: [
    "lore/encounters-kenzie",
    "lore/encounters-priya",
    "place/encounters-citywalk-vivo",
    "place/encounters-universal-studios-florida",
  ],
  recordedBy: ["story-recorder/inventory"],
} as const satisfies StoryChapterWritten
