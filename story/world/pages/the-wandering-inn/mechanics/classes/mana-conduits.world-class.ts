import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const manaConduits = {
  id: "01a0657e-022c-783b-8a08-9a8b67b231db",
  type: "page-type/world-class",
  slug: "mana-conduits",
  title: "Mana Conduits",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
