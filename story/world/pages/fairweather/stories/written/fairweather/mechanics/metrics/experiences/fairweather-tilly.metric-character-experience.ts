import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const fairweatherTilly = {
  id: "01a10365-9cef-7449-b034-b19fdc62b4d7",
  type: "page-type/metric-character-experience",
  slug: "fairweather-tilly",
  title: "Experience",
  description:
    "The prose never states Tilly's experience; 0 is where the progression starts each level.",
  character: "character-other/fairweather-tilly",
  value: 0,
  minValue: 0,
  displayOrder: 1,
  unrevealed: true,
} as const satisfies MetricCharacterExperience
