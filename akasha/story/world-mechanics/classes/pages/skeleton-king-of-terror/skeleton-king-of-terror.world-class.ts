import type { WorldClass } from "../../world-class.page-type.ts"

export const skeletonKingOfTerror = {
  id: "01a06586-0a3e-77b9-87b9-d0a4ad3aa74b",
  pageTypeSlug: "world-class",
  slug: "skeleton-king-of-terror",
  title: "Skeleton King of Terror",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["skeleton-knight"],
  references: "jsonl",
} as const satisfies WorldClass
