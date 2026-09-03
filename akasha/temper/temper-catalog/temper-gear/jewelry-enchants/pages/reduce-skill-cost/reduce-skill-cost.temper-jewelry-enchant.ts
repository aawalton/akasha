import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const reduceSkillCost = {
  id: "019e5c85-d950-7c44-917e-caefd8e9f59a",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "reduce-skill-cost",
  title: "Reduce Skill Cost",
  key: "reduce-skill-cost",
  effect: "Reduces Magicka and Stamina ability cost",
  glyphName: "Glyph of Reduce Skill Cost",
  essenceRune: "Indeko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POWER",
  displayOrder: 9,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
