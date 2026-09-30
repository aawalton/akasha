import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIiNala = {
  id: "01a0ed2c-b09c-7ba4-a8b6-29708efdf78b",
  type: "page-type/metric-character-health",
  slug: "overwhere-ii-nala",
  title: "Vigour",
  character: "character-player/overwhere-ii-nala",
  value: 27,
  minValue: 0,
  maxValue: 30,
  history: "jsonl",
  displayOrder: 1,
  revealedAs: "Skin hot and raw from hip to jaw; the rib bruise throbs",
} as const satisfies MetricCharacterHealth
