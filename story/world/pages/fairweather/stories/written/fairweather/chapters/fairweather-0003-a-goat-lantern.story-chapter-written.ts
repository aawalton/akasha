import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0003AGoatLantern = {
  id: "01a10495-c84d-7662-a68d-14e4c5718f9d",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0003-a-goat-lantern",
  position: 3,
  unit: "unit/words",
  title: "A Goat Lantern",
  story: "story-written/fairweather",
  ownLength: 8642,
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
    "place/fairweather-honeycomb",
    "place/fairweather-lanternmere",
    "place/fairweather-underbloom",
  ],
  characters: [
    "character-player/fairweather-elsie",
    "character-other/fairweather-cora",
    "character-other/fairweather-tamsin",
    "character-other/fairweather-tilly",
  ],
  recordedBy: ["story-recorder/plan", "story-recorder/inventory", "story-recorder/mechanics"],
  rulings: "jsonl",
} as const satisfies StoryChapterWritten
