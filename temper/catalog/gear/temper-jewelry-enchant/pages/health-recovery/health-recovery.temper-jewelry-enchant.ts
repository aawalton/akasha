import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const healthRecovery = {
  id: "019e5c85-d949-7117-b9fc-f50cc02b56ed",
  type: "page-type/temper-jewelry-enchant",
  slug: "health-recovery",
  title: "Health Recovery",
  key: "health-recovery",
  effect: "Increases Health Recovery",
  glyphName: "Glyph of Health Recovery",
  essenceRune: "Okoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_HEALTH_REGEN",
  displayOrder: 5,
  effects: "jsonl",
  hashPlace: 5,
  esoEnchantSearchCategory: 12,
  createdAt: "2026-05-25T00:25:36.329Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperJewelryEnchant
