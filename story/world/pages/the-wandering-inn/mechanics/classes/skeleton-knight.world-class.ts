import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const skeletonKnight = {
  id: "01a0657e-0256-77d7-9c51-ad17dcbbd61a",
  type: "page-type/world-class",
  slug: "skeleton-knight",
  title: "Skeleton Knight",
  world: "world/the-wandering-inn",
  appearanceCount: 12,
  evolvesFromSlugs: ["world-class/class-relic-guardian", "world-class/guardian"],
  evolvesToSlugs: ["world-class/deathkindly-guardian", "world-class/skeleton-king-of-terror"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:12.086Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
