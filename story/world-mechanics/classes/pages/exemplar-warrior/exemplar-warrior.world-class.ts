import type { WorldClass } from "../../world-class.page-type.ts"

export const exemplarWarrior = {
  id: "01a0657e-1361-750f-848f-e050aa79491d",
  pageTypeSlug: "world-class",
  slug: "exemplar-warrior",
  title: "Exemplar Warrior",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["veteran-warrior"],
  references: "jsonl",
} as const satisfies WorldClass
