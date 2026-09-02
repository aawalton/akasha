import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const potionSpeed = {
  id: "01a05fd8-a432-7dd2-8571-25d62da2dfae",
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
