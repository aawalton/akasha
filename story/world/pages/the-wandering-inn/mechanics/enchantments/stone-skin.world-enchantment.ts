import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const stoneSkin = {
  id: "01a0655a-7b7b-7220-9553-a62810300ecb",
  type: "page-type/world-enchantment",
  slug: "stone-skin",
  title: "Stone Skin",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
