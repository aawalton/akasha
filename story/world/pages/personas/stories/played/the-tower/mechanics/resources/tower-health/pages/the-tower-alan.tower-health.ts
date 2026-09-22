import type { TowerHealth } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/resources/tower-health/tower-health.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f1-9895-7b19-b842-149fb7a1deb7",
  type: "page-type/tower-health",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 121,
  minValue: 0,
  maxValue: 124,
} as const satisfies TowerHealth
