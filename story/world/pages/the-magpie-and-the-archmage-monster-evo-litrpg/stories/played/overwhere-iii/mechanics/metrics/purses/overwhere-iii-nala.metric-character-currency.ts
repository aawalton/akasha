import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const overwhereIiiNala = {
  id: "01a0ed28-1dfc-7ea5-abd6-321168920c0e",
  type: "page-type/metric-character-currency",
  slug: "overwhere-iii-nala",
  character: "character-player/overwhere-iii-nala",
  currency: "world-currency/overwhere-iii-coin",
  value: 283,
  minValue: 0,
  history: "jsonl",
  displayOrder: 6,
  unrevealed: false,
} as const satisfies MetricCharacterCurrency
