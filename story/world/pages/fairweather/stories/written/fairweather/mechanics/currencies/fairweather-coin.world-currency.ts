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
} as const satisfies WorldCurrency
