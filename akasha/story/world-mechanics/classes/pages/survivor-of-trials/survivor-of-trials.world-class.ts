import type { WorldClass } from "../../world-class.page-type.ts"

export const survivorOfTrials = {
  id: "01a06586-0a60-77dd-b3b6-f844f136ebdb",
  pageTypeSlug: "world-class",
  slug: "survivor-of-trials",
  title: "Survivor of Trials",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["survivor-of-starvation"],
  references: "jsonl",
} as const satisfies WorldClass
