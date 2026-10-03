import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0002NotSevered = {
  id: "01a10321-bcc2-7558-8635-6024a69d1645",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0002-not-severed",
  position: 2,
  unit: "unit/words",
  title: "Not Severed",
  story: "story-written/fairweather",
  ownLength: 9549,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  mechanicsIssues: "txt",
  mechanicsSentBack: true,
  lore: [
    "lore/fairweather-cora",
    "lore/fairweather-elsie",
    "lore/fairweather-tamsin",
    "lore/fairweather-tilly",
    "lore/fairweather-world",
    "place/fairweather-glasswood",
    "place/fairweather-guild-hall",
    "place/fairweather-honeycomb",
  ],
  characters: [
    "character-player/fairweather-elsie",
    "character-other/fairweather-tamsin",
    "character-other/fairweather-tilly",
    "character-other/fairweather-cora",
  ],
  recordedBy: [
    "story-recorder/inventory",
    "story-recorder/mechanics",
    "story-recorder/plan",
    "story-recorder/memory",
  ],
} as const satisfies StoryChapterWritten
