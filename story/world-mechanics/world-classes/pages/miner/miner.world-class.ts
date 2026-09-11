import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const miner = {
  id: "01a0657e-13a2-7735-83d4-d88943a026c3",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "miner",
  title: "Miner",
  world: "the-wandering-inn",
  aliases: ["miners"],
  references: "jsonl",
} as const satisfies WorldClass
