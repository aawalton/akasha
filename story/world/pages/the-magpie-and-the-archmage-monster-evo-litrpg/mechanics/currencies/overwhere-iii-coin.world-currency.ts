import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const overwhereIiiCoin = {
  id: "01a0f1e9-e51e-77b2-9aae-cedbd4ccd876",
  type: "page-type/world-currency",
  slug: "overwhere-iii-coin",
  title: "Coin",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description: "Copper, silver and gold coin.",
  denominations: [
    { name: "gold", worth: 10000 },
    { name: "silver", worth: 100 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-09-30T10:43:52.734Z",
  updatedAt: "2026-09-30T10:43:58.000Z",
} as const satisfies WorldCurrency
