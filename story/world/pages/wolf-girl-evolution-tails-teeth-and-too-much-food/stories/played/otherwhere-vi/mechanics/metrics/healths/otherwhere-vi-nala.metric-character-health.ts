import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereViNala = {
  id: "01a0ea3e-c8cd-75d5-a61f-710d8b5458b7",
  type: "page-type/metric-character-health",
  slug: "otherwhere-vi-nala",
  title: "HP",
  character: "character-player/otherwhere-vi-nala",
  value: 21,
  minValue: 0,
  maxValue: 30,
  history: "jsonl",
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
