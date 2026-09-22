import type { TowerAttributePoint } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-attribute-point/tower-attribute-point.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0ca2b-10e6-7fde-8964-7057f1366e99",
  type: "page-type/tower-attribute-point",
  slug: "the-tower-alan",
  character: "character-player/the-tower-alan",
  value: 3,
  minValue: 0,
} as const satisfies TowerAttributePoint
