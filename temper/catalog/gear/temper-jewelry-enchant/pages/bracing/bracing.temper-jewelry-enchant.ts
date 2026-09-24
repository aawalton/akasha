import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const bracing = {
  id: "019e5c85-d960-73f9-8cea-07b3219c1425",
  type: "page-type/temper-jewelry-enchant",
  slug: "bracing",
  title: "Bracing",
  key: "bracing",
  effect: "Reduces Block Cost",
  glyphName: "Glyph of Bracing",
  essenceRune: "Kaderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_BLOCK_AND_BASH",
  displayOrder: 18,
  effects: "jsonl",
} as const satisfies TemperJewelryEnchant
