import type { TowerItemDamage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-damage/tower-item-damage.page-type.types.ts"

export const theTowerAshlingLivingEmber = {
  id: "01a0d3dd-db84-771f-adeb-5df4a619bcc0",
  type: "page-type/tower-item-damage",
  slug: "the-tower-ashling-living-ember",
  item: "item/the-tower-ashling-living-ember",
  value: 8,
} as const satisfies TowerItemDamage
