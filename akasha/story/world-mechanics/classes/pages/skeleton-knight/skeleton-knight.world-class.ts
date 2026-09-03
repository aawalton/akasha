import type { WorldClass } from "../../world-class.page-type.ts"

export const skeletonKnight = {
  id: "01a0657e-0256-77d7-9c51-ad17dcbbd61a",
  pageTypeSlug: "world-class",
  slug: "skeleton-knight",
  title: "Skeleton Knight",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["class-relic-guardian", "guardian"],
  evolvesToSlugs: ["deathkindly-guardian", "skeleton-king-of-terror"],
  references: "jsonl",
} as const satisfies WorldClass
