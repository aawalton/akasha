import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const breathOfTheWildLink = {
  id: "01a10332-3d65-74ea-9667-7ac19007bc96",
  type: "page-type/metric-character-currency",
  slug: "breath-of-the-wild-link",
  character: "character-other/breath-of-the-wild-link",
  currency: "world-currency/breath-of-the-wild-spirit-orb",
  value: 0,
  minValue: 0,
  maxValue: 4,
  displayOrder: 3,
} as const satisfies MetricCharacterCurrency
