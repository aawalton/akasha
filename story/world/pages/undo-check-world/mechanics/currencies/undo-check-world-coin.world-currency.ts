import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const undoCheckWorldCoin = {
  id: "01a18309-e114-79ad-9e4e-eb08899ec7eb",
  type: "page-type/world-currency",
  slug: "undo-check-world-coin",
  title: "Test Coin",
  world: "world/undo-check-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies WorldCurrency
