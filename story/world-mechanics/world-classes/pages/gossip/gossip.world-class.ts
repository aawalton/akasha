import type { WorldClass } from "../../world-class.page-type.ts"

export const gossip = {
  id: "01a0657e-01e3-76d0-886f-8fc968a51f2d",
  pageTypeSlug: "world-class",
  slug: "gossip",
  title: "Gossip",
  worldSlug: "the-wandering-inn",
  aliases: ["gossips"],
  evolvesToSlugs: ["honest-reporter"],
  references: "jsonl",
} as const satisfies WorldClass
