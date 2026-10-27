import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const probeTwoWorldCoin = {
  id: "01a17fbf-aff5-71a9-88b9-679c06f4aa66",
  type: "page-type/world-currency",
  slug: "probe-two-world-coin",
  title: "Test Coin",
  world: "world/probe-two-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies WorldCurrency
