import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const fairweatherCoin = {
  id: "01a102af-305c-7aed-9805-3a47f915ecd0",
  type: "page-type/world-currency",
  slug: "fairweather-coin",
  title: "Coin",
  world: "world/fairweather",
  description: "Copper pips, silver lanterns and gold suns.",
  denominations: [
    { name: "sun", worth: 200 },
    { name: "lantern", worth: 10 },
    { name: "pip", worth: 1 },
  ],
  createdAt: "2026-10-03T16:53:18.044Z",
  updatedAt: "2026-10-03T16:53:25.000Z",
} as const satisfies WorldCurrency
