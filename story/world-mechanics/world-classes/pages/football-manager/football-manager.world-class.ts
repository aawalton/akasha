import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const footballManager = {
  id: "01a0657e-1365-7770-99d9-55d57be88b33",
  type: "world-class",
  slug: "football-manager",
  title: "Football Manager",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
