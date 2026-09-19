import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const mageAssassin = {
  id: "01a0657e-1391-7202-b7b7-7352146f5394",
  type: "page-type/world-class",
  slug: "mage-assassin",
  title: "Mage Assassin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
