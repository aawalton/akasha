import type { TowerAttunementRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/tower-attunement-rank.page-type.types.ts"

export const theTowerSoul = {
  id: "01a0ca72-0533-705f-9ad1-0e8ccd3f7065",
  type: "page-type/tower-attunement-rank",
  slug: "the-tower-soul",
  title: "Soul",
  place: 4,
  cap: 1000,
  bias: 4,
} as const satisfies TowerAttunementRank
