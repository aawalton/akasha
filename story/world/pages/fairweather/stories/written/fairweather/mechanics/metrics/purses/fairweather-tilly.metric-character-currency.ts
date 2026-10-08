import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const fairweatherTilly = {
  id: "01a10365-9cf0-72ba-b850-c4c567c1d555",
  type: "page-type/metric-character-currency",
  slug: "fairweather-tilly",
  description:
    "The prose never states Tilly's purse; she starts chapter 1 with 44 pips, a judgement for a girl who paid the two-lantern guild fee three days ago and has had no quest since.",
  character: "character-other/fairweather-tilly",
  currency: "world-currency/fairweather-coin",
  value: 7,
  minValue: 0,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
  createdAt: "2026-10-03T20:12:33.392Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies MetricCharacterCurrency
