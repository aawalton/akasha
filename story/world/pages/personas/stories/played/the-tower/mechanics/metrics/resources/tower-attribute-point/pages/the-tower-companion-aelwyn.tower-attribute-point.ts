import type { TowerAttributePoint } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-attribute-point/tower-attribute-point.page-type.types.ts"

export const theTowerCompanionAelwyn = {
  id: "01a0d3ec-8b77-7861-b404-7fe146b0dce5",
  type: "page-type/tower-attribute-point",
  slug: "the-tower-companion-aelwyn",
  character: "character-other/the-tower-companion-aelwyn",
  value: 0,
  minValue: 0,
} as const satisfies TowerAttributePoint
