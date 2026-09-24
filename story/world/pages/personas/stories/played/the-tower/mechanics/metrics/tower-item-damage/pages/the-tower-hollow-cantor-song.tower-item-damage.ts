import type { TowerItemDamage } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-damage/tower-item-damage.page-type.types.ts"

export const theTowerHollowCantorSong = {
  id: "01a0d3dd-e767-73b7-b5e2-76a5e8eace34",
  type: "page-type/tower-item-damage",
  slug: "the-tower-hollow-cantor-song",
  item: "item/the-tower-hollow-cantor-song",
  value: 14,
} as const satisfies TowerItemDamage
