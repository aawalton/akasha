import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gossip = {
  id: "01a0657e-01e3-76d0-886f-8fc968a51f2d",
  type: "page-type/world-class",
  slug: "gossip",
  title: "Gossip",
  world: "world/the-wandering-inn",
  appearanceCount: 33,
  aliases: ["gossips"],
  evolvesToSlugs: ["world-class/honest-reporter"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.971Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
