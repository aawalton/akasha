import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const banditQueen = {
  id: "01a0657e-1338-7bfa-8e0d-3fedc5377a75",
  type: "page-type/world-class",
  slug: "bandit-queen",
  title: "Bandit Queen",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
