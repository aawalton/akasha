import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const overwhereICoin = {
  id: "01a0f1e1-d3b6-727d-aa07-c8a30fb94ac4",
  type: "page-type/world-currency",
  slug: "overwhere-i-coin",
  title: "Coin",
  world: "world/hell-hound-evolution-litrpg",
  description: "Copper, silver and gold coin.",
  denominations: [
    { name: "gold", worth: 100 },
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
} as const satisfies WorldCurrency
