import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const spellguard = {
  id: "01a0655a-7b7b-76f5-bf20-635a0a64c3b2",
  type: "page-type/world-enchantment",
  slug: "spellguard",
  title: "Spellguard",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
