import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereXNala = {
  id: "01a0ea6b-6040-75ea-b22f-dd3775562b49",
  type: "page-type/metric-character-health",
  slug: "otherwhere-x-nala",
  character: "character-player/otherwhere-x-nala",
  value: 20,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
  createdAt: "2026-09-28T23:48:20.672Z",
  updatedAt: "2026-09-30T11:08:00.000Z",
} as const satisfies MetricCharacterHealth
