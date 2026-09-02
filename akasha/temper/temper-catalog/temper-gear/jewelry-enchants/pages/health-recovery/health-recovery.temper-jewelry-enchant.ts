import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const healthRecovery = {
  id: "01a05fd8-a430-72c9-9e38-f18f5f37be9c",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "health-recovery",
  title: "Health Recovery",
  key: "health-recovery",
  effect: "Increases Health Recovery",
  glyphName: "Glyph of Health Recovery",
  essenceRune: "Okoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH_REGEN",
  displayOrder: 5,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
