import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereXCoin = {
  id: "01a0f1e8-ab15-7908-8a4c-5b8d0cfdae1f",
  type: "page-type/world-currency",
  slug: "otherwhere-x-coin",
  title: "Coin",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  description: "Copper, silver and gold coin.",
  denominations: [
    { name: "gold", worth: 200 },
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
} as const satisfies WorldCurrency
