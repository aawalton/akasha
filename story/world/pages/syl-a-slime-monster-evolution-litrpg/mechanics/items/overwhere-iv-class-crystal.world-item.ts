import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIvClassCrystal = {
  id: "01a0ed31-f1da-71fc-928e-e821774fb463",
  type: "page-type/world-item",
  slug: "overwhere-iv-class-crystal",
  title: "Class Crystal",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A city crystal through which a person swaps to any class they have unlocked.",
} as const satisfies WorldItem
