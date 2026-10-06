import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const encounters0003AMinus = {
  id: "01a11369-9481-77dc-967a-d4181eb52b37",
  type: "page-type/story-chapter-written",
  slug: "encounters-0003-a-minus",
  position: 3,
  unit: "unit/words",
  title: "A-Minus",
  story: "story-written/encounters",
  ownLength: 5981,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: [
    "lore/encounters-hana",
    "lore/encounters-kenzie",
    "lore/encounters-priya",
    "lore/encounters-sofia",
    "lore/encounters-sofia-2",
    "lore/encounters-sofia-3",
    "place/encounters-citywalk-vivo",
    "place/encounters-royal-pacific-room",
    "place/encounters-universal-studios-florida",
  ],
  characters: [
    "character-player/encounters-alan",
    "character-other/encounters-priya",
    "character-other/encounters-sofia",
    "character-other/encounters-kenzie",
    "character-other/encounters-hana",
  ],
  recordedBy: [
    "story-recorder/plan",
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/memory",
  ],
} as const satisfies StoryChapterWritten
