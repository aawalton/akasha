import type { TowerItemDefence } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/metrics/tower-item-defence/tower-item-defence.page-type.types.ts"

export const theTowerWornBrigandine = {
  id: "01a0cb5c-b30b-7340-b85b-b5912d539691",
  type: "page-type/tower-item-defence",
  slug: "the-tower-worn-brigandine",
  item: "item/the-tower-worn-brigandine",
  value: 3,
} as const satisfies TowerItemDefence
