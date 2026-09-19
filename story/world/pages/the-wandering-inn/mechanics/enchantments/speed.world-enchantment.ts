import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const speed = {
  id: "01a0655a-7b7b-7d69-9fd1-f3166d0921ae",
  type: "page-type/world-enchantment",
  slug: "speed",
  title: "Speed",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
