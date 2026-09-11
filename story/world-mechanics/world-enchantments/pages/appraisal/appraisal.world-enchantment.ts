import type { WorldEnchantment } from "akasha/story/world-mechanics/world-enchantments/world-enchantment.page-type.types.ts"

export const appraisal = {
  id: "01a0655a-7b7b-779c-9310-0b0bbadde5e9",
  pageTypeSlug: "world-enchantment",
  type: "world-enchantment",
  slug: "appraisal",
  title: "Appraisal",
  world: "the-wandering-inn",
} as const satisfies WorldEnchantment
