import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const overwhereIiCoin = {
  id: "01a0f1e9-e51d-7416-b62a-a4c5e670b24d",
  type: "page-type/world-currency",
  slug: "overwhere-ii-coin",
  title: "Coin",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  description: "Coppers, silver pieces, silver bars and gold marks.",
  denominations: [
    { name: "silver bar", worth: 600 },
    { name: "gold mark", worth: 240 },
    { name: "silver piece", worth: 12 },
    { name: "copper", worth: 1 },
  ],
} as const satisfies WorldCurrency
