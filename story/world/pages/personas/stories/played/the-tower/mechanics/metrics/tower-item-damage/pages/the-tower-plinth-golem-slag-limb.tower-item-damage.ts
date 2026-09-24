import type { TowerItemDamage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-damage/tower-item-damage.page-type.types.ts"

export const theTowerPlinthGolemSlagLimb = {
  id: "01a0d3db-e605-79b4-9314-994f335d1d08",
  type: "page-type/tower-item-damage",
  slug: "the-tower-plinth-golem-slag-limb",
  item: "item/the-tower-plinth-golem-slag-limb",
  value: 20,
} as const satisfies TowerItemDamage
