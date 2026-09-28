import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const superSupportiveHaloOfTheMotherPlanet = {
  id: "01a0e9f0-79f4-7e0f-b141-28c9685a8a1a",
  type: "page-type/world-enchantment",
  slug: "super-supportive-halo-of-the-mother-planet",
  title: "Halo of the Mother Planet",
  world: "world/super-supportive",
  description: "A magical effect worked into a uniform.",
} as const satisfies WorldEnchantment
