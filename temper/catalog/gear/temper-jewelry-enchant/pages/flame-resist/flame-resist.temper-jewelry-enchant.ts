import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const flameResist = {
  id: "019e5c85-d952-75c2-8e1c-23698b58c47c",
  type: "page-type/temper-jewelry-enchant",
  slug: "flame-resist",
  title: "Flame Resist",
  key: "flame-resist",
  effect: "Increases Flame Resistance",
  glyphName: "Glyph of Flame Resist",
  essenceRune: "Rakeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FIRE_RESISTANT",
  displayOrder: 10,
  effects: "jsonl",
  hashPlace: 10,
  esoEnchantSearchCategory: 7,
  createdAt: "2026-05-25T00:25:36.338Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperJewelryEnchant
