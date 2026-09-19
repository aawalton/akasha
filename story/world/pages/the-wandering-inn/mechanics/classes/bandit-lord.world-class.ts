import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const banditLord = {
  id: "01a0657e-01af-75df-97f7-0541839f46c2",
  type: "page-type/world-class",
  slug: "bandit-lord",
  title: "Bandit Lord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
