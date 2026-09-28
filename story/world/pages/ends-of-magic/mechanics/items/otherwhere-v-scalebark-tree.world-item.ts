import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVScalebarkTree = {
  id: "01a0ea08-ddd4-71f6-94bc-1ff243ad80d2",
  type: "page-type/world-item",
  slug: "otherwhere-v-scalebark-tree",
  title: "Scalebark Tree",
  world: "world/ends-of-magic",
  aliases: ["scalebark"],
  description: "A huge, straight forest tree with grey scaled bark and bluish leaves.",
} as const satisfies WorldItem
