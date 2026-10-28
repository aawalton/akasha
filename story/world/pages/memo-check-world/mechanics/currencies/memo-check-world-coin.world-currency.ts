import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const memoCheckWorldCoin = {
  id: "01a1832d-38c0-70ab-b4c1-1dc36f677c14",
  type: "page-type/world-currency",
  slug: "memo-check-world-coin",
  title: "Test Coin",
  world: "world/memo-check-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies WorldCurrency
