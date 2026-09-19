import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const firstWarrior = {
  id: "01a0657e-01dc-7816-b209-9c002e1ada88",
  type: "page-type/world-class",
  slug: "first-warrior",
  title: "First Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
