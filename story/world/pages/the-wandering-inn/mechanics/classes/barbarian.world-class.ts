import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const barbarian = {
  id: "01a0657e-1339-7ed3-9556-01ae4a1983f5",
  type: "page-type/world-class",
  slug: "barbarian",
  title: "Barbarian",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
