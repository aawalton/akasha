import type { WorldEnchantment } from "akasha/story/world-mechanics/world-enchantments/world-enchantment.page-type.types.ts"

export const stoneSkin = {
  id: "01a0655a-7b7b-7220-9553-a62810300ecb",
  type: "world-enchantment",
  slug: "stone-skin",
  title: "Stone Skin",
  world: "the-wandering-inn",
} as const satisfies WorldEnchantment
