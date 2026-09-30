import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvMoney = {
  id: "01a0ed28-3fb2-79b5-9071-fc001faab75d",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-money",
  title: "Money",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "Copper, silver and gold coin, and what things cost. Money is the world-currency overwhere-iv-coin, and a character's money is a purse of it, counted in copper. Coin changes hands only as the trade check answers, or as a gift or theft. Coin left with the adventurers' hall is held there, not in her purse. Every change is written on the purse and a line of its history before the turn moves on.",
} as const satisfies WorldMechanic
