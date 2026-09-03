import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const prismaticRecovery = {
  id: "019e5c85-d94b-7840-9864-0746ea707834",
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
