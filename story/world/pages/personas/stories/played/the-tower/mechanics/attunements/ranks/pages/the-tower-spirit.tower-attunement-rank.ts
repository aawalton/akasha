import type { TowerAttunementRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/tower-attunement-rank.page-type.types.ts"

export const theTowerSpirit = {
  id: "01a0ca71-f51c-7310-ac4a-a3350945f69f",
  type: "page-type/tower-attunement-rank",
  slug: "the-tower-spirit",
  title: "Spirit",
  description: "The element is animated at will.",
  cap: 250,
} as const satisfies TowerAttunementRank
