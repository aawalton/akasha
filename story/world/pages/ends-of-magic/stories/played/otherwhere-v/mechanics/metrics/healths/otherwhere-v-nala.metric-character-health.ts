import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereVNala = {
  id: "01a0e9ff-ce46-7195-bfb1-b29119ecfe3a",
  type: "page-type/metric-character-health",
  slug: "otherwhere-v-nala",
  character: "character-player/otherwhere-v-nala",
  value: 0,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
  displayOrder: 1,
  createdAt: "2026-09-28T21:50:50.950Z",
  updatedAt: "2026-09-30T11:12:56.000Z",
} as const satisfies MetricCharacterHealth
