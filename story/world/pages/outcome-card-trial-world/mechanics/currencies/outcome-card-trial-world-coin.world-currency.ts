import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const outcomeCardTrialWorldCoin = {
  id: "01a183ae-dc71-75f3-bcb9-5791866a1561",
  type: "page-type/world-currency",
  slug: "outcome-card-trial-world-coin",
  title: "Test Coin",
  world: "world/outcome-card-trial-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies WorldCurrency
