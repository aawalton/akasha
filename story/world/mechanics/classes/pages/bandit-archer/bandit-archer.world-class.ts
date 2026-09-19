import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const banditArcher = {
  id: "01a0657e-1337-7784-83a1-7ecaade9ef2c",
  type: "page-type/world-class",
  slug: "bandit-archer",
  title: "Bandit Archer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
