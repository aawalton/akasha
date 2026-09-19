import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const caravanGuards = {
  id: "01a0657e-1346-7d24-abb0-15b89a80488b",
  type: "page-type/world-class",
  slug: "caravan-guards",
  title: "Caravan Guards",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
