import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const otherwhereXNala = {
  id: "01a0ea7f-7539-732e-8f9b-ea542032956c",
  type: "page-type/metric-character-experience",
  slug: "otherwhere-x-nala",
  title: "Essence",
  character: "character-player/otherwhere-x-nala",
  value: 0,
  minValue: 0,
  maxValue: 100,
  history: "jsonl",
  displayOrder: 2,
  unrevealed: true,
} as const satisfies MetricCharacterExperience
