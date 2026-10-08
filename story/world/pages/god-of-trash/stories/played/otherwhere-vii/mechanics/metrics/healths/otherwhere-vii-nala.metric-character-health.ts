import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereViiNala = {
  id: "01a0ea32-5de3-7747-a3f3-4f54899a7993",
  type: "page-type/metric-character-health",
  slug: "otherwhere-vii-nala",
  character: "character-player/otherwhere-vii-nala",
  value: 20,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
  createdAt: "2026-09-28T22:46:04.515Z",
  updatedAt: "2026-09-30T11:11:44.000Z",
} as const satisfies MetricCharacterHealth
