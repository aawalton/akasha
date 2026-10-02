import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const overwhereINala = {
  id: "01a0ed2c-3810-7a54-b332-01c4ebe20f21",
  type: "page-type/metric-character-experience",
  slug: "overwhere-i-nala",
  title: "Marks",
  character: "character-player/overwhere-i-nala",
  value: 5,
  minValue: 0,
  history: "jsonl",
  displayOrder: 10,
  unrevealed: true,
} as const satisfies MetricCharacterExperience
