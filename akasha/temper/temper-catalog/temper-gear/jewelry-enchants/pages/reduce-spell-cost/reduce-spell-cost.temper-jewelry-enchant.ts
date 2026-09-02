import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const reduceSpellCost = {
  id: "01a05fd8-a433-70d0-a1b0-c7be51a4f0b2",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "reduce-spell-cost",
  title: "Reduce Spell Cost",
  key: "reduce-spell-cost",
  effect: "Reduces Magicka ability cost",
  glyphName: "Glyph of Reduce Spell Cost",
  essenceRune: "Makderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_SPELL_COST",
  displayOrder: 7,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
