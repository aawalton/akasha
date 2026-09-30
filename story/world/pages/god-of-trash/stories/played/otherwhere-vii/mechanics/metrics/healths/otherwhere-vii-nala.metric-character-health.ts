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
} as const satisfies MetricCharacterHealth
