import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const overwhereIvStoreBoots = {
  id: "01a0f195-67e2-70e3-ae51-dc6370131172",
  type: "page-type/world-item",
  slug: "overwhere-iv-store-boots",
  title: "Store Boots",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Old leather boots from the watch's stores, cut for a man's feet.",
} as const satisfies WorldItem
