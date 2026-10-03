import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const fairweatherElsie = {
  id: "01a102af-305c-7b9c-92e3-ca176b2f51e7",
  type: "page-type/metric-character-experience",
  slug: "fairweather-elsie",
  title: "Experience",
  character: "character-player/fairweather-elsie",
  value: 0,
  minValue: 0,
  displayOrder: 1,
  unrevealed: true,
} as const satisfies MetricCharacterExperience
