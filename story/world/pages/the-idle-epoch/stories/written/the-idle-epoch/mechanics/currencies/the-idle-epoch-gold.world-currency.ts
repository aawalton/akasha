import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const theIdleEpochGold = {
  id: "01a10332-4088-72ab-870a-7960f8881154",
  type: "page-type/world-currency",
  slug: "the-idle-epoch-gold",
  title: "Gold",
  world: "world/the-idle-epoch",
  description: "The Substrate's money, written G and counted in whole Gold.",
  createdAt: "2026-10-03T19:16:27.400Z",
  updatedAt: "2026-10-03T19:16:30.000Z",
} as const satisfies WorldCurrency
