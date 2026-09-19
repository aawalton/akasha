import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kingOfTaima = {
  id: "01a0657e-1378-79be-88c5-87ba583bac10",
  type: "page-type/world-class",
  slug: "king-of-taima",
  title: "King of Taima",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
