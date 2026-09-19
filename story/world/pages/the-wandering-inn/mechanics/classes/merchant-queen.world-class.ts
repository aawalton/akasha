import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const merchantQueen = {
  id: "01a0657e-0231-7132-a7db-d29ab9bfe510",
  type: "page-type/world-class",
  slug: "merchant-queen",
  title: "Merchant Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
