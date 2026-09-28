import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVArmatures = {
  id: "01a0e9f7-1df0-7f0b-9df1-215879eac4c8",
  type: "page-type/world-item",
  slug: "otherwhere-v-armatures",
  title: "Armatures",
  world: "world/ends-of-magic",
  aliases: ["winged armatures", "battlesuits", "flying armor"],
  description: "Enchanted suits of armor with magical wings that let their wearers fly.",
} as const satisfies WorldItem
