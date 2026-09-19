import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const exemplarWarrior = {
  id: "01a0657e-1361-750f-848f-e050aa79491d",
  type: "page-type/world-class",
  slug: "exemplar-warrior",
  title: "Exemplar Warrior",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["veteran-warrior"],
  references: "jsonl",
} as const satisfies WorldClass
