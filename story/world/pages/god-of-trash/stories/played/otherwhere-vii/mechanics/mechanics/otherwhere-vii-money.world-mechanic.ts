import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereViiMoney = {
  id: "01a0ea34-e452-74aa-bb6c-0bcd49b9a38f",
  type: "page-type/world-mechanic",
  slug: "otherwhere-vii-money",
  title: "Money and Trade",
  world: "world/god-of-trash",
  description:
    "Copper pennies, silver and gold coins, and the goods and work they buy. Money is the world-currency otherwhere-vii-coin, and a character's money is a purse of it, counted in copper pennies. Spirit stones pass among mages across the sea and are not counted in a purse. A price is the lore's market price, and bargaining for less is an action check. Every change in money is written on the purse and a line of its history before the turn moves on. No sum shows as a number unless coins are counted in the scene.",
} as const satisfies WorldMechanic
