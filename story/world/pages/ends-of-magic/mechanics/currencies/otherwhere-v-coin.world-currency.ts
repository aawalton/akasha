import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const otherwhereVCoin = {
  id: "01a0f1e7-cd26-79aa-9318-edd9822a2587",
  type: "page-type/world-currency",
  slug: "otherwhere-v-coin",
  title: "Coin",
  world: "world/ends-of-magic",
  description: "Copper tesk, silver lir and gold oruna.",
  denominations: [
    { name: "oruna", worth: 400 },
    { name: "lir", worth: 20 },
    { name: "tesk", worth: 1 },
  ],
} as const satisfies WorldCurrency
