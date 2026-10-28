import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const pathsProbeWorldCoin = {
  id: "01a18008-7533-7328-87dd-93d962dce081",
  type: "page-type/world-currency",
  slug: "paths-probe-world-coin",
  title: "Test Coin",
  world: "world/paths-probe-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies WorldCurrency
