import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIiIronCoinBox = {
  id: "01a0fdd3-316c-7c13-a2f4-546f94a3ff9a",
  type: "page-type/world-item",
  slug: "overwhere-ii-iron-coin-box",
  title: "Iron Coin Box",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  description: "A heavy, locked iron box the size of a loaf, that clinks when tipped.",
} as const satisfies WorldItem
