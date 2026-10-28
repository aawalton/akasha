import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const outcomeCardsCheckWorldCoin = {
  id: "01a17ffe-7d82-7f57-9181-54de6cc9a078",
  type: "page-type/world-currency",
  slug: "outcome-cards-check-world-coin",
  title: "Test Coin",
  world: "world/outcome-cards-check-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T00:52:29.403Z",
  updatedAt: "2026-10-28T00:52:29.403Z",
} as const satisfies WorldCurrency
