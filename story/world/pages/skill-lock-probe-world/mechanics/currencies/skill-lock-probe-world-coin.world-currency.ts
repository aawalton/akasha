import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const skillLockProbeWorldCoin = {
  id: "01a17ff8-9a7f-7128-bb3d-f19399951a06",
  type: "page-type/world-currency",
  slug: "skill-lock-probe-world-coin",
  title: "Test Coin",
  world: "world/skill-lock-probe-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies WorldCurrency
