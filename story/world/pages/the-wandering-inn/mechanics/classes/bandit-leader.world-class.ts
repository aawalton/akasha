import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const banditLeader = {
  id: "01a0657e-01af-7975-b1ca-5c03f69c1dc2",
  type: "page-type/world-class",
  slug: "bandit-leader",
  title: "Bandit Leader",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
