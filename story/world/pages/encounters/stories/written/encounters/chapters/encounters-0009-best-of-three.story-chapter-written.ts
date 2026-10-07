import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0009BestOfThree = {
  id: "01a113d6-5a8d-7d85-aa44-3d4a656a8a5c",
  type: "page-type/story-chapter-written",
  slug: "encounters-0009-best-of-three",
  position: 9,
  unit: "unit/words",
  title: "Best of Three",
  story: "story-written/encounters",
  ownLength: 6484,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: [
    "lore/encounters-kenzie",
    "lore/encounters-kenzie-2",
    "lore/encounters-priya",
    "lore/encounters-priya-2",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "lore/encounters-sofia-3",
    "place/encounters-royal-pacific-room",
  ],
  characters: [
    "character-player/encounters-alan",
    "character-other/encounters-kenzie",
    "character-other/encounters-priya",
    "character-other/encounters-sofia",
  ],
  recordedBy: ["story-recorder/mechanics", "story-recorder/plan", "story-recorder/inventory"],
} as const satisfies StoryChapterWritten
