import type { StoryChapterWritten } from "akasha/story/world/stories/written/chapters/story-chapter-written.page-type.types.ts"

export const fairweather0002SkillsUsedNone = {
  id: "01a1047a-4936-79ff-b6a2-84bbb8667f63",
  type: "page-type/story-chapter-written",
  slug: "fairweather-0002-skills-used-none",
  position: 2,
  unit: "unit/words",
  title: "Skills Used, None",
  story: "story-written/fairweather",
  ownLength: 8119,
  prose: "txt",
  stepStatus: "step-status/recorders",
  beats: "jsonl",
  lore: [
    "lore/fairweather-cora",
    "lore/fairweather-elsie",
    "lore/fairweather-tamsin",
    "lore/fairweather-tilly",
    "lore/fairweather-world",
    "place/fairweather-crooked-kettle",
    "place/fairweather-guild-hall",
    "place/fairweather-honeycomb",
    "place/fairweather-lanternmere",
  ],
  characters: [
    "character-player/fairweather-elsie",
    "character-other/fairweather-cora",
    "character-other/fairweather-tamsin",
    "character-other/fairweather-tilly",
  ],
  recordedBy: ["story-recorder/plan", "story-recorder/inventory", "story-recorder/mechanics"],
} as const satisfies StoryChapterWritten
