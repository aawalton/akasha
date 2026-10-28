import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const pathsSheetCheckWorldCoin = {
  id: "01a182db-5bf2-75f1-a802-b2ad48f88817",
  type: "page-type/world-currency",
  slug: "paths-sheet-check-world-coin",
  title: "Test Coin",
  world: "world/paths-sheet-check-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T14:12:58.526Z",
  updatedAt: "2026-10-28T14:12:58.526Z",
} as const satisfies WorldCurrency
