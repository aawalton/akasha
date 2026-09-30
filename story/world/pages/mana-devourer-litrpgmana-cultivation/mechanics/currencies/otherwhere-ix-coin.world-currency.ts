import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereIxCoin = {
  id: "01a0f1e8-ab14-7e50-821c-bc860c5a4f95",
  type: "page-type/world-currency",
  slug: "otherwhere-ix-coin",
  title: "Coin",
  world: "world/mana-devourer-litrpgmana-cultivation",
  description: "Copper, silver and gold coin.",
  denominations: [
    { name: "gold", worth: 400 },
    { name: "silver", worth: 20 },
    { name: "copper", worth: 1 },
  ],
} as const satisfies WorldCurrency
