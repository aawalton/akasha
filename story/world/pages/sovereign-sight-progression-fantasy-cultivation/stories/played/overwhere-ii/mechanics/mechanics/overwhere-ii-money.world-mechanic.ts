import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIiMoney = {
  id: "01a0ed28-57ab-71c8-a30f-721cf50ec7c4",
  type: "page-type/world-mechanic",
  slug: "overwhere-ii-money",
  title: "Money",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  description:
    "The coin of Teyr: coppers, silver pieces, silver bars and gold. Money is the world-currency overwhere-ii-coin, and a character's money is a purse of it, counted in coppers. Every change is written on the purse and a line of its history before the turn moves on. Coin shows in the prose as the coins themselves, never as a count in coppers.",
} as const satisfies WorldMechanic
