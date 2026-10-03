import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const fairweatherTamsin = {
  id: "01a10365-9cf0-7c8d-ba6f-91ef4ac97e8f",
  type: "page-type/metric-character-currency",
  slug: "fairweather-tamsin",
  description:
    "The prose never states Tamsin's purse; she starts chapter 1 with 60 pips, a judgement for an E-rank adventurer living on F-rank and E-rank quest pay.",
  character: "character-other/fairweather-tamsin",
  currency: "world-currency/fairweather-coin",
  value: 52,
  minValue: 0,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
