import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const flyingWheels = {
  id: "01a0655a-7b7b-713a-bfd8-41af88203685",
  type: "page-type/world-enchantment",
  slug: "flying-wheels",
  title: "Flying Wheels",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
