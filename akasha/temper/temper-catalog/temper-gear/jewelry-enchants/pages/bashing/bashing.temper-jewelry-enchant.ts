import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const bashing = {
  id: "01a05fd8-a42d-78b7-845d-8dd0979ea6d3",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "bashing",
  title: "Bashing",
  key: "bashing",
  effect: "Increases Bash Damage",
  glyphName: "Glyph of Bashing",
  essenceRune: "Taderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_BASH_DAMAGE",
  displayOrder: 17,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
