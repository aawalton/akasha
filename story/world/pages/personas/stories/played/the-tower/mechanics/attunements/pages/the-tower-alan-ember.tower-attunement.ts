import type { TowerAttunement } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/tower-attunement.page-type.types.ts"

export const theTowerAlanEmber = {
  id: "01a0ca72-1655-75d4-b7de-239b1d3fa651",
  type: "page-type/tower-attunement",
  slug: "the-tower-alan-ember",
  character: "character-player/the-tower-alan",
  element: "tower-element/the-tower-ember",
  rank: "tower-attunement-rank/the-tower-manipulation",
  counter: 9,
} as const satisfies TowerAttunement
