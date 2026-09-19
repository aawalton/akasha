import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const hardening = {
  id: "01a0655a-7b7b-7471-bc1b-ee7287c70062",
  type: "page-type/world-enchantment",
  slug: "hardening",
  title: "Hardening",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
