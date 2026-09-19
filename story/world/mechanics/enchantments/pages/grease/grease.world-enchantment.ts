import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const grease = {
  id: "01a0655a-7b7b-7839-9696-b10c3ace84ee",
  type: "page-type/world-enchantment",
  slug: "grease",
  title: "Grease",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
