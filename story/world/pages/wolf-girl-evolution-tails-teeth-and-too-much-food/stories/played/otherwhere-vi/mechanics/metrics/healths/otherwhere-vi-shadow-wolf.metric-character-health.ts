import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereViShadowWolf = {
  id: "01a0ea4e-f0d0-7edd-aa1e-bfa3ffcba9a1",
  type: "page-type/metric-character-health",
  slug: "otherwhere-vi-shadow-wolf",
  title: "HP",
  character: "character-other/otherwhere-vi-shadow-wolf",
  value: 32,
  minValue: 0,
  maxValue: 32,
  history: "jsonl",
} as const satisfies MetricCharacterHealth
