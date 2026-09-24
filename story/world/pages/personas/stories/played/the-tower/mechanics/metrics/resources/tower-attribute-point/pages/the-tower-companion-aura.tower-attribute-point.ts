import type { TowerAttributePoint } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/resources/tower-attribute-point/tower-attribute-point.page-type.types.ts"

export const theTowerCompanionAura = {
  id: "01a0d3ec-9e91-78c1-8427-bedb0d42d1b7",
  type: "page-type/tower-attribute-point",
  slug: "the-tower-companion-aura",
  character: "character-other/the-tower-companion-aura",
  value: 0,
  minValue: 0,
} as const satisfies TowerAttributePoint
