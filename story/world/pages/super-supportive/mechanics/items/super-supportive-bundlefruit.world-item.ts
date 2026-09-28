import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveBundlefruit = {
  id: "01a0e9fc-be82-7c03-bb99-a30b889b1b15",
  type: "page-type/world-item",
  slug: "super-supportive-bundlefruit",
  title: "Bundlefruit",
  world: "world/super-supportive",
  aliases: ["bundlefruit wine"],
  description: "A fruit made into a mildly intoxicating drink.",
} as const satisfies WorldItem
