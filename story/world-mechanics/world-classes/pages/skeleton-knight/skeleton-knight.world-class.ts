import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const skeletonKnight = {
  id: "01a0657e-0256-77d7-9c51-ad17dcbbd61a",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "skeleton-knight",
  title: "Skeleton Knight",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["class-relic-guardian", "guardian"],
  evolvesToSlugs: ["deathkindly-guardian", "skeleton-king-of-terror"],
  references: "jsonl",
} as const satisfies WorldClass
