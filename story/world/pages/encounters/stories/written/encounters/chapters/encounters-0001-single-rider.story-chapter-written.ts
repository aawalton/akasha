import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0001SingleRider = {
  id: "01a11326-b2fe-7f73-bf32-2712ffab83c2",
  type: "page-type/story-chapter-written",
  slug: "encounters-0001-single-rider",
  position: 1,
  unit: "unit/words",
  title: "Single Rider",
  story: "story-written/encounters",
  ownLength: 10168,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-kenzie",
    "lore/encounters-priya",
    "lore/encounters-sofia",
    "place/encounters-cabana-bay-room",
    "place/encounters-islands-of-adventure",
  ],
  characters: [
    "character-player/encounters-alan",
    "character-other/encounters-sofia",
    "character-other/encounters-kenzie",
    "character-other/encounters-priya",
    "character-other/encounters-hana",
  ],
  recordedBy: [
    "story-recorder/plan",
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
  ],
} as const satisfies StoryChapterWritten
