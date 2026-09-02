import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const potionBoost = {
  id: "01a05fd8-a431-71e3-91f7-1121bcbfe178",
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
