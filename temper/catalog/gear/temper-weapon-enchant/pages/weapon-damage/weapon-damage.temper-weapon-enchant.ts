import type { TemperWeaponEnchant } from "akasha/temper/catalog/gear/temper-weapon-enchant/temper-weapon-enchant.page-type.types.ts"

export const weaponDamage = {
  id: "019e5c0d-dce7-7d85-8573-0a1869cbe34c",
  type: "page-type/temper-weapon-enchant",
  slug: "weapon-damage",
  title: "Weapon Damage",
  key: "weapon-damage",
  effect: "Increases Weapon and Spell Damage",
  glyphName: "Glyph of Weapon Damage",
  essenceRune: "Okori",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BERSERKER",
  displayOrder: 1,
  effects: "jsonl",
} as const satisfies TemperWeaponEnchant
