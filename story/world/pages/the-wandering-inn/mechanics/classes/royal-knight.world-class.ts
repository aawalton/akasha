import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const royalKnight = {
  id: "01a0657e-0249-7cae-b018-7d00e3d36b35",
  type: "page-type/world-class",
  slug: "royal-knight",
  title: "Royal Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
