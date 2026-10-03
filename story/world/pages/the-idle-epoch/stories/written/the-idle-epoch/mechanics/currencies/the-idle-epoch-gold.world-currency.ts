import type { WorldCurrency } from "akasha/story/world/mechanics/currencies/world-currency.page-type.types.ts"

export const theIdleEpochGold = {
  id: "01a10332-4088-72ab-870a-7960f8881154",
  type: "page-type/world-currency",
  slug: "the-idle-epoch-gold",
  title: "Gold",
  world: "world/the-idle-epoch",
  description: "The Substrate's money, written G and counted in whole Gold.",
} as const satisfies WorldCurrency
