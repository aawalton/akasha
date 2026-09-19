import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const crafterMage = {
  id: "01a0657e-1350-733c-891e-a0657c26c795",
  type: "page-type/world-class",
  slug: "crafter-mage",
  title: "Crafter Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
