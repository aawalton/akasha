import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const woodlandRangers = {
  id: "01a0657e-0272-7ded-a9fa-3dd8038835d5",
  type: "page-type/world-class",
  slug: "woodland-rangers",
  title: "Woodland Rangers",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
