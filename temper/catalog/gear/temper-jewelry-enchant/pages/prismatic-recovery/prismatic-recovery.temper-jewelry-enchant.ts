import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const prismaticRecovery = {
  id: "019e5c85-d94b-7840-9864-0746ea707834",
  type: "page-type/temper-jewelry-enchant",
  slug: "prismatic-recovery",
  title: "Prismatic Recovery",
  key: "prismatic-recovery",
  effect: "Increases Health, Magicka, and Stamina Recovery",
  glyphName: "Glyph of Prismatic Recovery",
  essenceRune: "Indeko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_REGEN",
  displayOrder: 6,
  effects: "jsonl",
  hashPlace: 6,
  esoEnchantSearchCategory: 37,
  createdAt: "2026-05-25T00:25:36.331Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperJewelryEnchant
