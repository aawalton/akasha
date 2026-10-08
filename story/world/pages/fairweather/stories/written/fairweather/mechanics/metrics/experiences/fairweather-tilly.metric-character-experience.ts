import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const fairweatherTilly = {
  id: "01a10365-9cef-7449-b034-b19fdc62b4d7",
  type: "page-type/metric-character-experience",
  slug: "fairweather-tilly",
  title: "Experience",
  description:
    "The prose never states Tilly's experience; 0 is where the progression starts each level.",
  character: "character-other/fairweather-tilly",
  value: 260,
  minValue: 0,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
  createdAt: "2026-10-03T20:12:33.391Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies MetricCharacterExperience
