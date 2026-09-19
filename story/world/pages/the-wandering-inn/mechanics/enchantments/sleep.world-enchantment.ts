import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const sleep = {
  id: "01a0655a-7b7b-7947-b97a-32b4af7fe0b3",
  type: "page-type/world-enchantment",
  slug: "sleep",
  title: "Sleep",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
