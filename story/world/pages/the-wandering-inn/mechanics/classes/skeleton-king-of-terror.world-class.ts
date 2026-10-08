import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const skeletonKingOfTerror = {
  id: "01a06586-0a3e-77b9-87b9-d0a4ad3aa74b",
  type: "page-type/world-class",
  slug: "skeleton-king-of-terror",
  title: "Skeleton King of Terror",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/skeleton-knight"],
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.398Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
