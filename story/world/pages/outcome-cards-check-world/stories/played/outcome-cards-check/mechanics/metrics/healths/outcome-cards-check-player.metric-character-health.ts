import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const outcomeCardsCheckPlayer = {
  id: "01a17ffe-7d82-7905-bf79-5d37aecefce8",
  type: "page-type/metric-character-health",
  slug: "outcome-cards-check-player",
  character: "character-player/outcome-cards-check-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies MetricCharacterHealth
