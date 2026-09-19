import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const arcaneWarrior = {
  id: "01a0657e-01a9-7fba-af13-aba3d794987b",
  type: "page-type/world-class",
  slug: "arcane-warrior",
  title: "Arcane Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
