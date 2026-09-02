import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const staminaRecovery = {
  id: "01a05fd8-a434-7ef6-8954-72447c1703c4",
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
