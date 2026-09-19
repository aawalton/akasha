import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const maceKnight = {
  id: "01a0657e-0221-7ee6-9dbc-1a31f3736cfd",
  type: "page-type/world-class",
  slug: "mace-knight",
  title: "Mace Knight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
