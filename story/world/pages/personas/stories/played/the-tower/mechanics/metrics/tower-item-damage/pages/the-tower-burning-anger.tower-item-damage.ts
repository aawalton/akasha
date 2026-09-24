import type { TowerItemDamage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-damage/tower-item-damage.page-type.types.ts"

export const theTowerBurningAnger = {
  id: "01a0d3dc-54b0-75b3-9f5a-3a7cf4a1275d",
  type: "page-type/tower-item-damage",
  slug: "the-tower-burning-anger",
  item: "item/the-tower-burning-anger",
  value: 16,
} as const satisfies TowerItemDamage
