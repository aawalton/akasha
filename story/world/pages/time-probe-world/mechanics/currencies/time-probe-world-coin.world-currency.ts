import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const timeProbeWorldCoin = {
  id: "01a1802d-b13e-7387-b640-8f2e50f58c70",
  type: "page-type/world-currency",
  slug: "time-probe-world-coin",
  title: "Test Coin",
  world: "world/time-probe-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies WorldCurrency
