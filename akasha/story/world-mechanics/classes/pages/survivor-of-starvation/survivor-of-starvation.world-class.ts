import type { WorldClass } from "../../world-class.page-type.ts"

export const survivorOfStarvation = {
  id: "01a0657e-0262-7d9a-b1a6-1ceadb4e14bf",
  pageTypeSlug: "world-class",
  slug: "survivor-of-starvation",
  title: "Survivor of Starvation",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["survivor-of-trials"],
  references: "jsonl",
} as const satisfies WorldClass
