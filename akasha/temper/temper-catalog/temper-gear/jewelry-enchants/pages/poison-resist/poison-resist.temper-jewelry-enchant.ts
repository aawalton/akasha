import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const poisonResist = {
  id: "01a05fd8-a431-75c5-b460-0ff5e6546c68",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "poison-resist",
  title: "Poison Resist",
  key: "poison-resist",
  effect: "Increases Poison Resistance",
  glyphName: "Glyph of Poison Resist",
  essenceRune: "Kuoko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_POISON_RESISTANT",
  displayOrder: 13,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
