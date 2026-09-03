import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const potionBoost = {
  id: "019e5c85-d962-7c52-8074-8d27ca9e6822",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "potion-boost",
  title: "Potion Boost",
  key: "potion-boost",
  effect: "Increases Potion Effect Duration",
  glyphName: "Glyph of Potion Boost",
  essenceRune: "Oru",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_POTION_EFFECTIVENESS",
  displayOrder: 19,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
