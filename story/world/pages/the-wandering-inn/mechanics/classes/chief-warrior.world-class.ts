import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chiefWarrior = {
  id: "01a0657e-01c5-7364-a400-7ca251e0eefe",
  type: "page-type/world-class",
  slug: "chief-warrior",
  title: "Chief Warrior",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
} as const satisfies WorldClass
