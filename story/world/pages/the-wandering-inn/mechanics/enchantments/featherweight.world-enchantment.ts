import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const featherweight = {
  id: "01a0655a-7b7b-74c8-b4bd-cec3ab217cf6",
  type: "page-type/world-enchantment",
  slug: "featherweight",
  title: "Featherweight",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
