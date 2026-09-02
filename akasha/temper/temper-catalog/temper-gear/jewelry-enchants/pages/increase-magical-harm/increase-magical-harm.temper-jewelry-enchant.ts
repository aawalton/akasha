import type { TemperJewelryEnchant } from "../../temper-jewelry-enchant.page-type.ts"

export const increaseMagicalHarm = {
  id: "01a05fd8-a430-75ad-8ffc-34d51d195edf",
  pageTypeSlug: "temper-jewelry-enchant",
  slug: "increase-magical-harm",
  title: "Increase Magical Harm",
  key: "increase-magical-harm",
  effect: "Increases Weapon and Spell Damage",
  glyphName: "Glyph of Increase Magical Harm",
  essenceRune: "Makderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_SPELL_DAMAGE",
  displayOrder: 2,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperJewelryEnchant
