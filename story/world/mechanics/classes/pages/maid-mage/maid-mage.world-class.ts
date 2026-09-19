import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const maidMage = {
  id: "01a0657e-022b-744e-93e4-e6524c8dba40",
  type: "page-type/world-class",
  slug: "maid-mage",
  title: "Maid Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
