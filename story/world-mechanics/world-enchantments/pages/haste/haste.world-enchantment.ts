import type { WorldEnchantment } from "akasha/story/world-mechanics/world-enchantments/world-enchantment.page-type.types.ts"

export const haste = {
  id: "01a0655a-7b7b-7669-a3fc-357e420a5cd7",
  type: "world-enchantment",
  slug: "haste",
  title: "Haste",
  world: "the-wandering-inn",
} as const satisfies WorldEnchantment
