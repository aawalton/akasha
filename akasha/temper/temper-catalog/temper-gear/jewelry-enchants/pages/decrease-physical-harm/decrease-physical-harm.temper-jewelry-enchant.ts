import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const decreasePhysicalHarm = {
  id: "01a05fd8-a42e-7554-ab2f-c378fafa7268",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "decrease-physical-harm",
  title: "Decrease Physical Harm",
  key: "decrease-physical-harm",
  effect: "Increases Physical Resistance",
  glyphName: "Glyph of Decrease Physical Harm",
  essenceRune: "Taderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_DECREASE_PHYSICAL_DAMAGE",
  displayOrder: 15,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
