import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIvSlimeJelly = {
  id: "01a0ed31-f1da-75b5-86ea-6207b55d058d",
  type: "page-type/world-item",
  slug: "overwhere-iv-slime-jelly",
  title: "Slime Jelly",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The blue jelly of a slime, gathered and sold for salves and cooking.",
} as const satisfies WorldItem
