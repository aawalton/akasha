import type { WorldEnchantment } from "akasha/story/world-mechanics/world-enchantments/world-enchantment.page-type.types.ts"

export const invisibility = {
  id: "01a0655a-7b7b-7e4d-ac68-525d9e0063e5",
  type: "world-enchantment",
  slug: "invisibility",
  title: "Invisibility",
  world: "the-wandering-inn",
} as const satisfies WorldEnchantment
