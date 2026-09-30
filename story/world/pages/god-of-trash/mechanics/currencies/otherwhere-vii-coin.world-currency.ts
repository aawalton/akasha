import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereViiCoin = {
  id: "01a0f1e7-cd27-7a60-bc4b-d97f8ff9575d",
  type: "page-type/world-currency",
  slug: "otherwhere-vii-coin",
  title: "Coin",
  world: "world/god-of-trash",
  description: "Copper pennies, silver and gold coins.",
  denominations: [
    { name: "gold", worth: 1000 },
    { name: "silver", worth: 100 },
    { name: "penny", worth: 1 },
  ],
} as const satisfies WorldCurrency
