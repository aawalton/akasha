import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const footballStriker = {
  id: "01a0657e-1365-7058-9941-307e63ab1fc7",
  type: "page-type/world-class",
  slug: "football-striker",
  title: "Football Striker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
