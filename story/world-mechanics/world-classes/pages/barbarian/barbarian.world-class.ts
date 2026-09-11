import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const barbarian = {
  id: "01a0657e-1339-7ed3-9556-01ae4a1983f5",
  type: "world-class",
  slug: "barbarian",
  title: "Barbarian",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
