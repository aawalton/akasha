import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const skillLockProbeWorldCoin = {
  id: "01a17ff2-6f78-7007-bdc7-3fe1c6b74dca",
  type: "page-type/world-currency",
  slug: "skill-lock-probe-world-coin",
  title: "Test Coin",
  world: "world/skill-lock-probe-world",
  description: "Silver and copper coin.",
  denominations: [
    { name: "silver", worth: 10 },
    { name: "copper", worth: 1 },
  ],
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies WorldCurrency
