import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const magickaRecovery = {
  id: "01a05fd8-a431-777f-a314-87b7783a9533",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "magicka-recovery",
  title: "Magicka Recovery",
  key: "magicka-recovery",
  effect: "Increases Magicka Recovery",
  glyphName: "Glyph of Magicka Recovery",
  essenceRune: "Makkoma",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_MAGICKA_REGEN",
  displayOrder: 3,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
