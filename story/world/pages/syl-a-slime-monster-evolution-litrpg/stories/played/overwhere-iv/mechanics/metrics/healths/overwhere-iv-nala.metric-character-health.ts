import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIvNala = {
  id: "01a0ed22-eab7-7c50-8bc3-05e5e81b9872",
  type: "page-type/metric-character-health",
  slug: "overwhere-iv-nala",
  character: "character-player/overwhere-iv-nala",
  value: 55,
  minValue: 0,
  maxValue: 55,
  history: "jsonl",
  displayOrder: 1,
  revealedAs: "Healed and whole, the gash closed, your back eased.",
} as const satisfies MetricCharacterHealth
