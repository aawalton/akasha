import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barkeep = {
  id: "01a0657e-01b1-7d80-b18f-140091bb2f04",
  type: "page-type/world-class",
  slug: "barkeep",
  title: "Barkeep",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
