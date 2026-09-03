import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const potionSpeed = {
  id: "019e5c85-d964-7132-a7c6-9891932a6a78",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "potion-speed",
  title: "Potion Speed",
  key: "potion-speed",
  effect: "Reduces Potion Cooldown",
  glyphName: "Glyph of Potion Speed",
  essenceRune: "Oru",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_REDUCE_POTION_COOLDOWN",
  displayOrder: 20,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
