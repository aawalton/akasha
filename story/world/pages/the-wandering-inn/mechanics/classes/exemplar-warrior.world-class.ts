import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const exemplarWarrior = {
  id: "01a0657e-1361-750f-848f-e050aa79491d",
  type: "page-type/world-class",
  slug: "exemplar-warrior",
  title: "Exemplar Warrior",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  evolvesFromSlugs: ["world-class/veteran-warrior"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.449Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
