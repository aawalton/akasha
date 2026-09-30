import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereIxNala = {
  id: "01a0ea39-98fc-7a4e-a4e7-1f7d4404a693",
  type: "page-type/metric-character-health",
  slug: "otherwhere-ix-nala",
  character: "character-player/otherwhere-ix-nala",
  value: 218,
  minValue: 0,
  maxValue: 410,
  history: "jsonl",
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
