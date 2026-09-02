import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const reduceFeatCost = {
  id: "01a05fd8-a433-7900-9a86-c1ad9e39834d",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "reduce-feat-cost",
  title: "Reduce Feat Cost",
  key: "reduce-feat-cost",
  effect: "Reduces Stamina ability cost",
  glyphName: "Glyph of Reduce Feat Cost",
  essenceRune: "Taderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_FEAT_COST",
  displayOrder: 8,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
