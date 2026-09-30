import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereXiCoin = {
  id: "01a0f1e8-ab14-7161-a79f-b652ba475a7b",
  type: "page-type/world-currency",
  slug: "otherwhere-xi-coin",
  title: "Coin",
  world: "world/the-calamitous-bob-stubbed",
  description: "Copper bits, silver talents and gold.",
  denominations: [
    { name: "gold", worth: 400 },
    { name: "talent", worth: 20 },
    { name: "bit", worth: 1 },
  ],
} as const satisfies WorldCurrency
