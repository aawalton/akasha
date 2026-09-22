import type { TowerAttunementRank } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/ranks/tower-attunement-rank.page-type.types.ts"

export const theTowerManipulation = {
  id: "01a0ca71-e451-7772-ba8b-ffc1d12074cf",
  type: "page-type/tower-attunement-rank",
  slug: "the-tower-manipulation",
  title: "Manipulation",
  description: "The element is moved and formed deliberately.",
  cap: 50,
  bias: 2,
} as const satisfies TowerAttunementRank
