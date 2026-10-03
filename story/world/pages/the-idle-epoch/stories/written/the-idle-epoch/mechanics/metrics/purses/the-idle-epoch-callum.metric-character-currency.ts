import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const theIdleEpochCallum = {
  id: "01a10332-4088-72fb-8a5d-13495edae4a0",
  type: "page-type/metric-character-currency",
  slug: "the-idle-epoch-callum",
  character: "character-player/the-idle-epoch-callum",
  currency: "world-currency/the-idle-epoch-gold",
  value: 2156,
  minValue: 0,
  displayOrder: 1,
  unrevealed: false,
} as const satisfies MetricCharacterCurrency
