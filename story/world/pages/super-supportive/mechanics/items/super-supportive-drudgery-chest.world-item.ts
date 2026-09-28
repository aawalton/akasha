import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveDrudgeryChest = {
  id: "01a0e9f8-6bb3-7b4a-a430-d2fff56a3d19",
  type: "page-type/world-item",
  slug: "super-supportive-drudgery-chest",
  title: "drudgery chest",
  world: "world/super-supportive",
  aliases: ["drudgery box", "drudgery room"],
  description: "A little factory that can be taught to do a repetitive job.",
} as const satisfies WorldItem
