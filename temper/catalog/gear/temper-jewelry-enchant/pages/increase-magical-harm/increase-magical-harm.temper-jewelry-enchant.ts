import type { TemperJewelryEnchant } from "akasha/temper/catalog/gear/temper-jewelry-enchant/temper-jewelry-enchant.page-type.types.ts"

export const increaseMagicalHarm = {
  id: "019e5c85-d942-701a-886b-f0e90fb4751f",
  type: "page-type/temper-jewelry-enchant",
  slug: "increase-magical-harm",
  title: "Increase Magical Harm",
  key: "increase-magical-harm",
  effect: "Increases Weapon and Spell Damage",
  glyphName: "Glyph of Increase Magical Harm",
  essenceRune: "Makderi",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_INCREASE_SPELL_DAMAGE",
  displayOrder: 2,
  effects: "jsonl",
  hashPlace: 2,
  esoEnchantSearchCategory: 32,
  createdAt: "2026-05-25T00:25:36.322Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies TemperJewelryEnchant
