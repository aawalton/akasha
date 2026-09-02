import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const diseaseResist = {
  id: "01a05fd8-a42f-7e35-800b-725305270351",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "disease-resist",
  title: "Disease Resist",
  key: "disease-resist",
  effect: "Increases Disease Resistance",
  glyphName: "Glyph of Disease Resist",
  essenceRune: "Haoko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DISEASE_RESISTANT",
  displayOrder: 14,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
