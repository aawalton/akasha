import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const bashing = {
  id: "019e5c85-d95d-7f46-b068-c3b9e8d6ab01",
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
