import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIvMonsterCore = {
  id: "01a0ed31-f1da-720e-91dd-fc1d2b3d302d",
  type: "page-type/world-item",
  slug: "overwhere-iv-monster-core",
  title: "Monster Core",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The hard, mana-bearing heart some monsters carry, sold for crafting and magic.",
} as const satisfies WorldItem
