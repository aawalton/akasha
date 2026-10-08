import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const survivorOfTrials = {
  id: "01a06586-0a60-77dd-b3b6-f844f136ebdb",
  type: "page-type/world-class",
  slug: "survivor-of-trials",
  title: "Survivor of Trials",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesFromSlugs: ["world-class/survivor-of-starvation"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.432Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
