import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereViCoin = {
  id: "01a0f1e7-cd27-721a-a2ef-3759e76f92c9",
  type: "page-type/world-currency",
  slug: "otherwhere-vi-coin",
  title: "Coin",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  description: "Copper, silver and gold coin.",
  denominations: [
    { name: "gold", worth: 100 },
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
} as const satisfies WorldCurrency
