import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const survivorOfTrials = {
  id: "01a06586-0a60-77dd-b3b6-f844f136ebdb",
  type: "world-class",
  slug: "survivor-of-trials",
  title: "Survivor of Trials",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["survivor-of-starvation"],
  references: "jsonl",
} as const satisfies WorldClass
