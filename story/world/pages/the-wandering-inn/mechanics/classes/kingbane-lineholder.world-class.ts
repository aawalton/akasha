import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const kingbaneLineholder = {
  id: "01a0657e-020c-7e12-9216-1d94928da06d",
  type: "page-type/world-class",
  slug: "kingbane-lineholder",
  title: "Kingbane Lineholder",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/doorgnoll"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.012Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
