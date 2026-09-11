import type { WorldEnchantment } from "akasha/story/world-mechanics/world-enchantments/world-enchantment.page-type.types.ts"

export const fear = {
  id: "01a0655a-7b7b-7cf8-81ab-e66f3260effe",
  type: "world-enchantment",
  slug: "fear",
  title: "Fear",
  world: "the-wandering-inn",
} as const satisfies WorldEnchantment
