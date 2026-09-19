import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const impactGuard = {
  id: "01a0655a-7b7b-77da-b56f-5982a459ffaa",
  type: "page-type/world-enchantment",
  slug: "impact-guard",
  title: "Impact Guard",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
