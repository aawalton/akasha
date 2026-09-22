import type { TowerAttunement } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/attunements/tower-attunement.page-type.types.ts"

export const theTowerAlanForce = {
  id: "01a0ca72-2879-70c4-b585-6820a88cef06",
  type: "page-type/tower-attunement",
  slug: "the-tower-alan-force",
  character: "character-player/the-tower-alan",
  element: "tower-element/the-tower-force",
  rank: "tower-attunement-rank/the-tower-affinity",
  counter: 1,
} as const satisfies TowerAttunement
