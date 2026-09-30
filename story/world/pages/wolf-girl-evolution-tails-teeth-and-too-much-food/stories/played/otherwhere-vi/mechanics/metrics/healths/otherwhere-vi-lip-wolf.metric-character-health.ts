import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereViLipWolf = {
  id: "01a0ea4e-f0cf-7855-ba1d-559df5288f71",
  type: "page-type/metric-character-health",
  slug: "otherwhere-vi-lip-wolf",
  title: "HP",
  character: "character-other/otherwhere-vi-lip-wolf",
  value: 28,
  minValue: 0,
  maxValue: 28,
  history: "jsonl",
} as const satisfies MetricCharacterHealth
