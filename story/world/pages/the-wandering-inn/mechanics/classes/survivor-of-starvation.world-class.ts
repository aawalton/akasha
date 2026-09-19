import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const survivorOfStarvation = {
  id: "01a0657e-0262-7d9a-b1a6-1ceadb4e14bf",
  type: "page-type/world-class",
  slug: "survivor-of-starvation",
  title: "Survivor of Starvation",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["survivor-of-trials"],
  references: "jsonl",
} as const satisfies WorldClass
