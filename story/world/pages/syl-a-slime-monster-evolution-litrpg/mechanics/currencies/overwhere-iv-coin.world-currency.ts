import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const overwhereIvCoin = {
  id: "01a0f1e9-e51d-7210-b244-772efbe96c2e",
  type: "page-type/world-currency",
  slug: "overwhere-iv-coin",
  title: "Coin",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Copper, silver and gold coin.",
  denominations: [
    { name: "gold", worth: 100 },
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-09-30T10:43:52.733Z",
  updatedAt: "2026-09-30T10:43:58.000Z",
} as const satisfies WorldCurrency
