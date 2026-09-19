import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const veteranWarrior = {
  id: "01a0657e-026e-71e9-af9f-4da88ecd07fb",
  type: "page-type/world-class",
  slug: "veteran-warrior",
  title: "Veteran Warrior",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["exemplar-warrior"],
  references: "jsonl",
} as const satisfies WorldClass
