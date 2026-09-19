import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const courtMage = {
  id: "01a0657e-134f-7896-ad16-7151b1a5e290",
  type: "page-type/world-class",
  slug: "court-mage",
  title: "Court Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
