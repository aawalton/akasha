import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0007 = {
  id: "01a113ae-78ac-7a33-92a8-7c67a49ddfcc",
  type: "page-type/story-chapter-written",
  slug: "encounters-0007",
  position: 7,
  unit: "unit/words",
  title: "Chapter 7",
  story: "story-written/encounters",
  ownLength: 0,
  prose: "txt",
  stepStatus: "step-status/game-master",
  beats: "jsonl",
  mechanicsIssues: "txt",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-hana-2",
    "lore/encounters-kenzie",
    "lore/encounters-kenzie-2",
    "lore/encounters-priya",
    "lore/encounters-priya-2",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "lore/encounters-sofia-3",
    "place/encounters-royal-pacific-room",
  ],
  recordedBy: ["story-recorder/inventory", "story-recorder/mechanics", "story-recorder/plan"],
} as const satisfies StoryChapterWritten
