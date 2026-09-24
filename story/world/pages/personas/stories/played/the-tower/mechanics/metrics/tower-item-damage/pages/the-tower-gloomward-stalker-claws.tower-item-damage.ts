import type { TowerItemDamage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-damage/tower-item-damage.page-type.types.ts"

export const theTowerGloomwardStalkerClaws = {
  id: "01a0d3dc-0b9e-7383-ae4b-3742977ef42a",
  type: "page-type/tower-item-damage",
  slug: "the-tower-gloomward-stalker-claws",
  item: "item/the-tower-gloomward-stalker-claws",
  value: 12,
} as const satisfies TowerItemDamage
