import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const poisonResist = {
  id: "019e5c85-d956-7d2f-891d-0d40261fddf5",
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
