import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const overwhereIvNalaClass = {
  id: "01a0f3d1-8f23-7167-bdf4-0d49001fd25a",
  type: "page-type/metric-character-experience",
  slug: "overwhere-iv-nala-class",
  character: "character-player/overwhere-iv-nala",
  value: 9,
  minValue: 0,
  maxValue: 40,
  history: "jsonl",
  displayOrder: 4,
  unrevealed: true,
} as const satisfies MetricCharacterExperience
