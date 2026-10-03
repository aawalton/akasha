import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theIdleEpochMoney = {
  id: "01a10332-4088-7bd9-a492-957deed603cd",
  type: "page-type/world-mechanic",
  slug: "the-idle-epoch-money",
  title: "Money",
  world: "world/the-idle-epoch",
  description:
    "Money in the Detroit Barrier Zone is Gold, carried in a character's System inventory and counted in whole Gold. Trade happens at the Exchange. Unaffiliated players pay a Residuum contribution toward the Barrier, withheld at the point of sale. A character's purse moves only by a sum the prose names: a price paid, a sale's net, or an idle report's Gold earned.",
} as const satisfies WorldMechanic
