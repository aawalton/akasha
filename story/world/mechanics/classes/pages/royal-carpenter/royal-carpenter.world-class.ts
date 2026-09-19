import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalCarpenter = {
  id: "01a0657e-0248-724b-8b29-33f1c7b857a5",
  type: "page-type/world-class",
  slug: "royal-carpenter",
  title: "Royal Carpenter",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
