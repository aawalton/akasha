import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const terror = {
  id: "01a0655a-7b7b-776b-9668-c1354e0058bd",
  type: "page-type/world-enchantment",
  slug: "terror",
  title: "Terror",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
