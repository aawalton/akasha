import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const flameResist = {
  id: "01a05fd8-a42f-7710-b3f1-76e0ae831d9e",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "flame-resist",
  title: "Flame Resist",
  key: "flame-resist",
  effect: "Increases Flame Resistance",
  glyphName: "Glyph of Flame Resist",
  essenceRune: "Rakeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIRE_RESISTANT",
  displayOrder: 10,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
