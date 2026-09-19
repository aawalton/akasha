import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const gemMage = {
  id: "01a0657e-01df-7059-9791-bbea24025edb",
  type: "page-type/world-class",
  slug: "gem-mage",
  title: "Gem Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
