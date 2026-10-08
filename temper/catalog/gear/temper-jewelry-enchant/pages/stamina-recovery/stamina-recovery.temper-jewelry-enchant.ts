import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const staminaRecovery = {
  id: "019e5c85-d946-7a55-8269-7417f599aa31",
  type: "page-type/temper-jewelry-enchant",
  slug: "stamina-recovery",
  title: "Stamina Recovery",
  key: "stamina-recovery",
  effect: "Increases Stamina Recovery",
  glyphName: "Glyph of Stamina Recovery",
  essenceRune: "Denima",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_STAMINA_REGEN",
  displayOrder: 4,
  effects: "jsonl",
  hashPlace: 4,
  esoEnchantSearchCategory: 18,
  createdAt: "2026-05-25T00:25:36.326Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperJewelryEnchant
