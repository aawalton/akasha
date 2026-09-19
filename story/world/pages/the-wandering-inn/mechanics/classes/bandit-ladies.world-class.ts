import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const banditLadies = {
  id: "01a0657e-1337-77e7-9d1e-de34eb56c56f",
  type: "page-type/world-class",
  slug: "bandit-ladies",
  title: "Bandit Ladies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
