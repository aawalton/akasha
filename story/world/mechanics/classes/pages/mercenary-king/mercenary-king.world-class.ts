import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mercenaryKing = {
  id: "01a0657e-0231-71d7-9408-d4b5334dc0a7",
  type: "page-type/world-class",
  slug: "mercenary-king",
  title: "Mercenary King",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
