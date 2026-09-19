import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gossip = {
  id: "01a0657e-01e3-76d0-886f-8fc968a51f2d",
  type: "page-type/world-class",
  slug: "gossip",
  title: "Gossip",
  world: "world/the-wandering-inn",
  aliases: ["gossips"],
  evolvesToSlugs: ["honest-reporter"],
  references: "jsonl",
} as const satisfies WorldClass
