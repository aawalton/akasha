import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const magickaRecovery = {
  id: "019e5c85-d944-7808-a7cb-6ef7ac7b95ee",
  type: "page-type/temper-jewelry-enchant",
  slug: "magicka-recovery",
  title: "Magicka Recovery",
  key: "magicka-recovery",
  effect: "Increases Magicka Recovery",
  glyphName: "Glyph of Magicka Recovery",
  essenceRune: "Makkoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_MAGICKA_REGEN",
  displayOrder: 3,
  effects: "jsonl",
  hashPlace: 3,
  esoEnchantSearchCategory: 14,
  createdAt: "2026-05-25T00:25:36.324Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperJewelryEnchant
