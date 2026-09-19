import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const spellswords = {
  id: "01a0657e-025e-74dc-9a0d-45c7193ef8b2",
  type: "page-type/world-class",
  slug: "spellswords",
  title: "Spellswords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
