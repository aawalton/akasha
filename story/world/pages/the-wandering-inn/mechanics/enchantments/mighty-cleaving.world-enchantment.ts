import type { WorldEnchantment } from "akasha/story/world/mechanics/enchantments/world-enchantment.page-type.types.ts"

export const mightyCleaving = {
  id: "01a0655a-7b7b-7e33-ab03-2eba05bf9675",
  type: "page-type/world-enchantment",
  slug: "mighty-cleaving",
  title: "Mighty Cleaving",
  world: "world/the-wandering-inn",
} as const satisfies WorldEnchantment
