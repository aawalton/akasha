import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const craftsmen = {
  id: "01a0657e-01cc-701c-bf1f-5d386ca93af8",
  type: "page-type/world-class",
  slug: "craftsmen",
  title: "Craftsmen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
