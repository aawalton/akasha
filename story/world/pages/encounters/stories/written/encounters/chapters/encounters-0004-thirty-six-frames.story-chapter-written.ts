import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0004ThirtySixFrames = {
  id: "01a1137d-b233-7fb8-99ca-d8d744203740",
  type: "page-type/story-chapter-written",
  slug: "encounters-0004-thirty-six-frames",
  position: 4,
  unit: "unit/words",
  title: "Thirty-Six Frames",
  story: "story-written/encounters",
  ownLength: 5191,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-priya",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "lore/encounters-sofia-3",
    "place/encounters-royal-pacific-room",
  ],
  characters: [
    "character-player/encounters-alan",
    "character-other/encounters-hana",
    "character-other/encounters-sofia",
    "character-other/encounters-priya",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
  ],
} as const satisfies StoryChapterWritten
