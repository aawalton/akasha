import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const staminaRecovery = {
  id: "019e5c85-d946-7a55-8269-7417f599aa31",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "stamina-recovery",
  title: "Stamina Recovery",
  key: "stamina-recovery",
  effect: "Increases Stamina Recovery",
  glyphName: "Glyph of Stamina Recovery",
  essenceRune: "Denima",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_STAMINA_REGEN",
  displayOrder: 4,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
