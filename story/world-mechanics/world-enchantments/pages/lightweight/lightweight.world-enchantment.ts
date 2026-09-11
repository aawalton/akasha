import type { WorldEnchantment } from "akasha/story/world-mechanics/world-enchantments/world-enchantment.page-type.types.ts"

export const lightweight = {
  id: "01a0655a-7b7b-7715-84bd-864665616fff",
  pageTypeSlug: "world-enchantment",
  type: "world-enchantment",
  slug: "lightweight",
  title: "Lightweight",
  world: "the-wandering-inn",
} as const satisfies WorldEnchantment
