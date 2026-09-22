import type { TowerAttunementRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/tower-attunement-rank.page-type.types.ts"

export const theTowerAffinity = {
  id: "01a0ca71-d269-7e98-8d63-d26025d95ad1",
  type: "page-type/tower-attunement-rank",
  slug: "the-tower-affinity",
  title: "Affinity",
  description: "The element is sensed deliberately, and no more than sensed.",
  cap: 10,
} as const satisfies TowerAttunementRank
