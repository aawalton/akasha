import type { WorldItem } from "akasha/story/world/mechanics/items/world-item.page-type.types.ts"

export const otherwhereVMagicResistantIngredients = {
  id: "01a0e9f9-8feb-7ae0-8f69-b86a6b31798e",
  type: "page-type/world-item",
  slug: "otherwhere-v-magic-resistant-ingredients",
  title: "Magic-Resistant Alchemical Ingredients",
  world: "world/ends-of-magic",
  description: "Magic-resistant alchemical substances.",
} as const satisfies WorldItem
