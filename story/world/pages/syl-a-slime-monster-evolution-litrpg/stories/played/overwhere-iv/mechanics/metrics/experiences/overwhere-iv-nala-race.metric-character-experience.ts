import type { MetricCharacterExperience } from "akasha/story/world/mechanics/metrics/metric-character/resource/experience/metric-character-experience.page-type.types.ts"

export const overwhereIvNalaRace = {
  id: "01a0ed22-eab6-730a-bf84-da380cf53e95",
  type: "page-type/metric-character-experience",
  slug: "overwhere-iv-nala-race",
  character: "character-player/overwhere-iv-nala",
  value: 1,
  minValue: 0,
  maxValue: 60,
  history: "jsonl",
  displayOrder: 3,
  unrevealed: true,
} as const satisfies MetricCharacterExperience
