import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const emberdeepCoin = {
  id: "01a0fde6-9f88-77f8-9827-35fa13eb9534",
  type: "page-type/world-currency",
  slug: "emberdeep-coin",
  title: "Coin",
  world: "world/emberdeep",
  description: "Copper pennies, silver marks and gold crowns.",
  denominations: [
    { name: "crown", worth: 240 },
    { name: "mark", worth: 12 },
    { name: "penny", worth: 1 },
  ],
} as const satisfies WorldCurrency
