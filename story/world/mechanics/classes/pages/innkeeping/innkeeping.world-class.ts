import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const innkeeping = {
  id: "01a0657e-020b-73d3-a516-1ae34af3d8bb",
  type: "page-type/world-class",
  slug: "innkeeping",
  title: "Innkeeping",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
