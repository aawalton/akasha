import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const evercut = {
  id: "01a0655a-7b7b-7c60-8e22-7b75d0769c0c",
  type: "page-type/world-enchantment",
  slug: "evercut",
  title: "Evercut",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
