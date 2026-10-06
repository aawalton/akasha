import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0002Eleven = {
  id: "01a11357-05b9-7e6d-bf3c-a870ec1b5225",
  type: "page-type/story-chapter-written",
  slug: "encounters-0002-eleven",
  position: 2,
  unit: "unit/words",
  title: "Eleven",
  story: "story-written/encounters",
  ownLength: 5865,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-kenzie",
    "lore/encounters-priya",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "place/encounters-royal-pacific-lounge",
    "place/encounters-royal-pacific-room",
  ],
  characters: [
    "character-player/encounters-alan",
    "character-other/encounters-kenzie",
    "character-other/encounters-sofia",
    "character-other/encounters-priya",
    "character-other/encounters-hana",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
  ],
} as const satisfies StoryChapterWritten
