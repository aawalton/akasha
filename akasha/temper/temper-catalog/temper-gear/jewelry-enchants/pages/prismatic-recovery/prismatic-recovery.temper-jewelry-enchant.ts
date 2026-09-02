import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const prismaticRecovery = {
  id: "01a05fd8-a432-7bfd-bc9f-4a6411cdce21",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "prismatic-recovery",
  title: "Prismatic Recovery",
  key: "prismatic-recovery",
  effect: "Increases Health, Magicka, and Stamina Recovery",
  glyphName: "Glyph of Prismatic Recovery",
  essenceRune: "Indeko",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_PRISMATIC_REGEN",
  displayOrder: 6,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
