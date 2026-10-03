import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const fairweatherTilly = {
  id: "01a10365-9cf0-72ba-b850-c4c567c1d555",
  type: "page-type/metric-character-currency",
  slug: "fairweather-tilly",
  description:
    "The prose never states Tilly's purse; she starts chapter 1 with 44 pips, a judgement for a girl who paid the two-lantern guild fee three days ago and has had no quest since.",
  character: "character-other/fairweather-tilly",
  currency: "world-currency/fairweather-coin",
  value: 40,
  minValue: 0,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
