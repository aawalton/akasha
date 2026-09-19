import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const axeWarrior = {
  id: "01a0657e-1336-76e7-8d37-7b3a21cbd134",
  type: "page-type/world-class",
  slug: "axe-warrior",
  title: "Axe Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
