import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const drunks = {
  id: "01a0657e-01d5-7f90-bd8c-0b38de6e615f",
  type: "page-type/world-class",
  slug: "drunks",
  title: "Drunks",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
