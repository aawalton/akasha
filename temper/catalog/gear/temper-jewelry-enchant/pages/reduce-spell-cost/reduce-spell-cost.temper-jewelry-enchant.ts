import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const reduceSpellCost = {
  id: "019e5c85-d94d-77bd-b10c-f85cf52b46e4",
  type: "page-type/temper-jewelry-enchant",
  slug: "reduce-spell-cost",
  title: "Reduce Spell Cost",
  key: "reduce-spell-cost",
  effect: "Reduces Magicka ability cost",
  glyphName: "Glyph of Reduce Spell Cost",
  essenceRune: "Makderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_SPELL_COST",
  displayOrder: 7,
  effects: "jsonl",
  hashPlace: 7,
  esoEnchantSearchCategory: 25,
  createdAt: "2026-05-25T00:25:36.333Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperJewelryEnchant
