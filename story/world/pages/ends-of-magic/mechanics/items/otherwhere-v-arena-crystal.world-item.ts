import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVArenaCrystal = {
  id: "01a0ea04-ac69-7dc4-b3de-2b00050fcb63",
  type: "page-type/world-item",
  slug: "otherwhere-v-arena-crystal",
  title: "Arena Crystal",
  world: "world/ends-of-magic",
  aliases: ["arena shell"],
  description: "An indestructible magical crystal.",
} as const satisfies WorldItem
