import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const prodigyMage = {
  id: "01a06586-0a18-78bd-ada1-19aa25ce2b71",
  type: "page-type/world-class",
  slug: "prodigy-mage",
  title: "Prodigy Mage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
