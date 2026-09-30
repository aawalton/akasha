import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIvMoney = {
  id: "01a0e9f3-1922-7a50-8942-cd533d2a059f",
  type: "page-type/world-mechanic",
  slug: "otherwhere-iv-money",
  title: "Money and Trade",
  world: "world/beware-of-chicken",
  description:
    "Copper coins, silver and spirit stones, and the goods and work they are traded for. Money is the world-currency otherwhere-iv-coin, and a character's money is a purse of it, counted in copper coins. Spirit stones pass among cultivators and are not counted in a purse. A price is the lore's market price, and bargaining for less is an action check. Every change in money is written on the purse and a line of its history before the turn moves on. No sum shows as a number unless coins are counted in the scene.",
} as const satisfies WorldMechanic
