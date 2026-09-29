import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereXiSilverite = {
  id: "01a0ea88-77cf-7ad8-8d34-2fbba1d40dc5",
  type: "page-type/world-item",
  slug: "otherwhere-xi-silverite",
  title: "Silverite",
  world: "world/the-calamitous-bob-stubbed",
  description: "A silvery metal that holds and blocks magic.",
  aliases: ["Star metal"],
} as const satisfies WorldItem
