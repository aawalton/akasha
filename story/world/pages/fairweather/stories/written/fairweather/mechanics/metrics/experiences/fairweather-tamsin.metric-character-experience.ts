import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const fairweatherTamsin = {
  id: "01a10365-9cef-7b80-bf57-3fafd969dd98",
  type: "page-type/metric-character-experience",
  slug: "fairweather-tamsin",
  title: "Experience",
  description:
    "The prose never states Tamsin's experience; 0 is where the progression starts each level.",
  character: "character-other/fairweather-tamsin",
  value: 0,
  minValue: 0,
  displayOrder: 1,
  unrevealed: true,
} as const satisfies MetricCharacterExperience
