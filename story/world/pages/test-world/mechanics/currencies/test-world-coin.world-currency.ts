import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const testWorldCoin = {
  id: "01a17ec5-a3e3-7561-a9e1-1bd00f4fad8d",
  type: "page-type/world-currency",
  slug: "test-world-coin",
  title: "Test Coin",
  world: "world/test-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldCurrency
