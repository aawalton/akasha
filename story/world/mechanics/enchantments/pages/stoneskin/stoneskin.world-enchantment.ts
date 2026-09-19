import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const stoneskin = {
  id: "01a0655a-7b7b-7e20-b761-f7a6d2b10eb1",
  type: "page-type/world-enchantment",
  slug: "stoneskin",
  title: "Stoneskin",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
