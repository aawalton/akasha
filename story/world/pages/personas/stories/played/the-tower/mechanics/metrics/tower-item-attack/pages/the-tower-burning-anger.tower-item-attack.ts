import type { TowerItemAttack } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-attack/tower-item-attack.page-type.types.ts"

export const theTowerBurningAnger = {
  id: "01a0ca50-25d1-7caf-b8b2-866f5bf809dd",
  type: "page-type/tower-item-attack",
  slug: "the-tower-burning-anger",
  item: "item/the-tower-burning-anger",
  value: 10,
} as const satisfies TowerItemAttack
