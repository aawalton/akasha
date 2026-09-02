import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const frostResist = {
  id: "01a05fd8-a42f-7fdb-94e4-37ea29561052",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "frost-resist",
  title: "Frost Resist",
  key: "frost-resist",
  effect: "Increases Frost Resistance",
  glyphName: "Glyph of Frost Resist",
  essenceRune: "Dekeipa",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_FROST_RESISTANT",
  displayOrder: 11,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
