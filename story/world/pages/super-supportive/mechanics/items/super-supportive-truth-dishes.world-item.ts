import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveTruthDishes = {
  id: "01a0e9fc-0701-7bb7-8732-81c72677273c",
  type: "page-type/world-item",
  slug: "super-supportive-truth-dishes",
  title: "Enchanted antique dishes",
  world: "world/super-supportive",
  description: "Dishes that let those eating from them together hide secrets but not speak lies.",
} as const satisfies WorldItem
