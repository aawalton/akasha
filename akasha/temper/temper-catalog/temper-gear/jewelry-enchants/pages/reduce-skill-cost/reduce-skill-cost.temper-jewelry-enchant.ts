import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const reduceSkillCost = {
  id: "01a05fd8-a433-7296-8df8-e37dd7173719",
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
