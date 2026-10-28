import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const pendingRollTrialWorldCoin = {
  id: "01a183cf-b828-73f7-8cb0-59ab932a63d1",
  type: "page-type/world-currency",
  slug: "pending-roll-trial-world-coin",
  title: "Test Coin",
  world: "world/pending-roll-trial-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies WorldCurrency
