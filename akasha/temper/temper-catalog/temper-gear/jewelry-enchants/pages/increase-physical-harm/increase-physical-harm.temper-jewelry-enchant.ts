import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const increasePhysicalHarm = {
  id: "01a05fd8-a430-7f5a-9e6f-4f34dddf0818",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "increase-physical-harm",
  title: "Increase Physical Harm",
  key: "increase-physical-harm",
  effect: "Increases Weapon and Spell Damage",
  glyphName: "Glyph of Increase Physical Harm",
  essenceRune: "Taderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_PHYSICAL_DAMAGE",
  displayOrder: 1,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
