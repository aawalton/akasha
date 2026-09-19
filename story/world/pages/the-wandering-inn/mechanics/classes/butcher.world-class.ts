import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const butcher = {
  id: "01a0657e-1341-736d-9ae5-f35928ec7db5",
  type: "page-type/world-class",
  slug: "butcher",
  title: "Butcher",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
