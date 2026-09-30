import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereViiiNala = {
  id: "01a0ea42-b5ae-716f-9b66-818fea67402c",
  type: "page-type/metric-character-health",
  slug: "otherwhere-viii-nala",
  character: "character-player/otherwhere-viii-nala",
  value: 20,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
} as const satisfies MetricCharacterHealth
