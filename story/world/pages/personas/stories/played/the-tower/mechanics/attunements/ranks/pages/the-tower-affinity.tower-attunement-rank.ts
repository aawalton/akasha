import type { TowerAttunementRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/tower-attunement-rank.page-type.types.ts"

export const theTowerAffinity = {
  id: "01a0ca71-d269-7e98-8d63-d26025d95ad1",
  type: "page-type/tower-attunement-rank",
  slug: "the-tower-affinity",
  title: "Affinity",
  place: 1,
  description: "The element is sensed deliberately, and no more than sensed.",
  cap: 10,
  bias: 1,
  createdAt: "2026-09-22T18:47:32.201Z",
  updatedAt: "2026-09-26T17:59:43.000Z",
} as const satisfies TowerAttunementRank
