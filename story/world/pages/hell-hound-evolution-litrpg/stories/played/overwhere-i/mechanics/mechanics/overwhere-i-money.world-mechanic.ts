import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIMoney = {
  id: "01a0ed20-0546-7da8-bf5d-2ce700b23177",
  type: "page-type/world-mechanic",
  slug: "overwhere-i-money",
  title: "Money",
  world: "world/hell-hound-evolution-litrpg",
  description:
    "Copper, silver and gold coin, and what things cost. Money is the world-currency overwhere-i-coin, and a character's money is a purse of it, counted in copper. Nala came with no coin at all. A meal costs two copper, a bed for the night five, a wool cloak four silver. A day's hired labour pays eight copper; a beast's pelt sells for one to five silver. A fair price is paid as asked; haggling is settled by the trade check. Every change in coin is written on her purse and a line of its history before the turn moves on. No coin total shows as a number save as the coins she counts in her hand.",
} as const satisfies WorldMechanic
