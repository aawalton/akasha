import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereViiiCoin = {
  id: "01a0f1e8-ab14-7b5c-b91c-29c17795019c",
  type: "page-type/world-currency",
  slug: "otherwhere-viii-coin",
  title: "Money",
  world: "world/breaker-of-horizons",
  description: "Crowns and bits.",
  denominations: [
    { name: "crown", worth: 100 },
    { name: "bit", worth: 1 },
  ],
} as const satisfies WorldCurrency
