import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const herbMage = {
  id: "01a0657e-1372-717b-819f-7fd8340bd70c",
  type: "page-type/world-class",
  slug: "herb-mage",
  title: "Herb Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
