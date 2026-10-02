import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const overwhereIiiNalaGlimmerstones = {
  id: "01a0f1ee-43ba-7c32-be3f-099bfbef12cc",
  type: "page-type/metric-character-currency",
  slug: "overwhere-iii-nala-glimmerstones",
  character: "character-player/overwhere-iii-nala",
  currency: "world-currency/overwhere-iii-glimmerstone",
  value: 3,
  minValue: 0,
  history: "jsonl",
  displayOrder: 4,
} as const satisfies MetricCharacterCurrency
