import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const warehouseManager = {
  id: "01a0657e-0270-77a9-978f-feb8dba97809",
  type: "page-type/world-class",
  slug: "warehouse-manager",
  title: "Warehouse Manager",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
