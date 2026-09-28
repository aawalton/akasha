import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const superSupportiveQuickEmbroidery = {
  id: "01a0e9f8-6bb4-78f0-9d89-4c7f3545fa29",
  type: "page-type/world-item",
  slug: "super-supportive-quick-embroidery",
  title: "Quick embroidery",
  world: "world/super-supportive",
  aliases: ["instant embroidery"],
  description: "Small paper packets of gray thread that apply embroidery like stickers.",
} as const satisfies WorldItem
