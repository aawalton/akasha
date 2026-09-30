import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereIvCoin = {
  id: "01a0f1e7-cd25-76fc-91a9-947644292002",
  type: "page-type/world-currency",
  slug: "otherwhere-iv-coin",
  title: "Coin",
  world: "world/beware-of-chicken",
  description: "Copper coins, strung by the hundred, and silver taels.",
  denominations: [
    { name: "tael", worth: 1000 },
    { name: "string", worth: 100 },
    { name: "copper", worth: 1 },
  ],
} as const satisfies WorldCurrency
