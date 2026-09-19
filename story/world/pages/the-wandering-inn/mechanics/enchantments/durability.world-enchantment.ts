import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const durability = {
  id: "01a0655a-7b7b-7dbd-afa9-24bc9931dca0",
  type: "page-type/world-enchantment",
  slug: "durability",
  title: "Durability",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
