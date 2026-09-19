import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const caravaners = {
  id: "01a0657e-1346-7881-8971-060d01d775cc",
  type: "page-type/world-class",
  slug: "caravaners",
  title: "Caravaners",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
