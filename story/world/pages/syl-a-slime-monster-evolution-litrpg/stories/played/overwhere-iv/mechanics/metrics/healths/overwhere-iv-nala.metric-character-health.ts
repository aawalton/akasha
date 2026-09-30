import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIvNala = {
  id: "01a0ed22-eab7-7c50-8bc3-05e5e81b9872",
  type: "page-type/metric-character-health",
  slug: "overwhere-iv-nala",
  character: "character-player/overwhere-iv-nala",
  value: 43,
  minValue: 0,
  maxValue: 45,
  history: "jsonl",
  displayOrder: 1,
  revealedAs: "The club thumps into your shoulder. It hurts.",
} as const satisfies MetricCharacterHealth
