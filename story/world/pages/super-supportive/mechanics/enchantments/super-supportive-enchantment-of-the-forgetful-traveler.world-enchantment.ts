import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const superSupportiveEnchantmentOfTheForgetfulTraveler = {
  id: "01a0e9fc-06ff-763a-af6b-499b836c5cbf",
  type: "page-type/world-enchantment",
  slug: "super-supportive-enchantment-of-the-forgetful-traveler",
  title: "Enchantment of the Forgetful Traveler",
  world: "world/super-supportive",
  description:
    "An extremely tedious and notoriously difficult enchantment that makes an object tend to return to its owner.",
} as const satisfies WorldEnchantment
