import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const frostResist = {
  id: "019e5c85-d953-7c74-99c6-3940984cf7de",
  type: "page-type/temper-jewelry-enchant",
  slug: "frost-resist",
  title: "Frost Resist",
  key: "frost-resist",
  effect: "Increases Frost Resistance",
  glyphName: "Glyph of Frost Resist",
  essenceRune: "Dekeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FROST_RESISTANT",
  displayOrder: 11,
  effects: "jsonl",
} as const satisfies TemperJewelryEnchant
