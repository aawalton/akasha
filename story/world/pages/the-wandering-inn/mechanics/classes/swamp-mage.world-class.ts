import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const swampMage = {
  id: "01a0657e-0262-7250-bb48-2de4d51c8480",
  type: "page-type/world-class",
  slug: "swamp-mage",
  title: "Swamp Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
