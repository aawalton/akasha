import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const innkeeperOfTheMagicalFrontier = {
  id: "01a0657e-1376-7080-9a02-c24e9ce619ad",
  type: "page-type/world-class",
  slug: "innkeeper-of-the-magical-frontier",
  title: "Innkeeper of the Magical Frontier",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/vice-innkeeper-of-spells"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.470Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
