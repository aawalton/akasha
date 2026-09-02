import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const bracing = {
  id: "01a05fd8-a42e-7de6-9235-cd0a883f76e9",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "bracing",
  title: "Bracing",
  key: "bracing",
  effect: "Reduces Block Cost",
  glyphName: "Glyph of Bracing",
  essenceRune: "Kaderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_BLOCK_AND_BASH",
  displayOrder: 18,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
