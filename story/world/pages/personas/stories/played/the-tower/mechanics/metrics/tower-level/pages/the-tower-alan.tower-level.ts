import type { TowerLevel } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-level/tower-level.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0ca3a-a51d-7c5a-80ea-5f4517cfc289",
  type: "page-type/tower-level",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 7,
} as const satisfies TowerLevel
