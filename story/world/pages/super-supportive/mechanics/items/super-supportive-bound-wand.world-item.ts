import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveBoundWand = {
  id: "01a0e9f8-aa21-734c-b230-868ffc01fe0c",
  type: "page-type/world-item",
  slug: "super-supportive-bound-wand",
  title: "Bound wand",
  world: "world/super-supportive",
  aliases: ["wand"],
  description: "A wand bound to one wizard, almost like an auriad.",
} as const satisfies WorldItem
