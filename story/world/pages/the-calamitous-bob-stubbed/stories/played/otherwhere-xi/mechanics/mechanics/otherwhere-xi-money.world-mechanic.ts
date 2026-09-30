import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiMoney = {
  id: "01a0ea88-1a35-7aa0-b70a-adb10af0e103",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-money",
  title: "Money",
  world: "world/the-calamitous-bob-stubbed",
  description:
    "Coins of gold, silver and copper. Money is the world-currency otherwhere-xi-coin, and a character's money is a purse of it, counted in copper bits. Nala came with no coin at all. Prices are the places' lore: a bowl of stew two bits, a loft bed four, sandals ten. A day's farm work in the hills pays six bits in lambing season, or meals and a bed. A mending potion costs about thirty silver, three months of a labourer's pay. A desert glass globule sells to Imra's alchemist for two to four silver. Her strange shirt and tights would fetch a silver from the alchemist, and leave her bare. By waystone custom she may take an offering in need, and owes one back when able. A fair price is paid as asked; haggling is settled by the trade check. Every change in coin is written on her purse and a line of its history before the turn moves on. No coin total shows as a number save as the coins she counts in her hand.",
} as const satisfies WorldMechanic
