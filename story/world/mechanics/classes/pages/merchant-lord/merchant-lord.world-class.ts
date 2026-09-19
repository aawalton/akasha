import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const merchantLord = {
  id: "01a0657e-13a0-796b-afa1-aaa048e857d3",
  type: "page-type/world-class",
  slug: "merchant-lord",
  title: "Merchant Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
