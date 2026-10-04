import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0001TheLeftovers = {
  id: "01a10457-5586-79ea-9338-e12f21d6f53e",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0001-the-leftovers",
  position: 1,
  unit: "unit/words",
  title: "The Leftovers",
  story: "story-written/fairweather",
  ownLength: 9285,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: [
    "lore/fairweather-cora",
    "lore/fairweather-elsie",
    "lore/fairweather-tamsin",
    "lore/fairweather-tilly",
    "lore/fairweather-world",
    "place/fairweather-guild-hall",
    "place/fairweather-hall-of-naming",
    "place/fairweather-honeycomb",
    "place/fairweather-lanternmere",
  ],
  characters: [
    "character-player/fairweather-elsie",
    "character-other/fairweather-cora",
    "character-other/fairweather-tamsin",
    "character-other/fairweather-tilly",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/plan",
    "story-recorder/mechanics",
    "story-recorder/memory",
  ],
} as const satisfies StoryChapterWritten
