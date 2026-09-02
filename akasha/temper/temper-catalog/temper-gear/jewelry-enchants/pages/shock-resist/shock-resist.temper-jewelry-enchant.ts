import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const shockResist = {
  id: "01a05fd8-a434-7725-9716-4045de9201e9",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "shock-resist",
  title: "Shock Resist",
  key: "shock-resist",
  effect: "Increases Shock Resistance",
  glyphName: "Glyph of Shock Resist",
  essenceRune: "Meip",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_SHOCK_RESISTANT",
  displayOrder: 12,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
