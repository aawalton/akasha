import type { TemperWeaponEnchant } from "../../temper-weapon-enchant.page-type.ts"

export const weaponDamage = {
  id: "01a05fd8-a45d-7d38-802f-22071cf07eb6",
  pageTypeSlug: "temper-weapon-enchant",
  slug: "weapon-damage",
  title: "Weapon Damage",
  key: "weapon-damage",
  effect: "Increases Weapon and Spell Damage",
  glyphName: "Glyph of Weapon Damage",
  essenceRune: "Okori",
  esoEnchantConstantName: "ENCHANTMENT_SEARCH_CATEGORY_BERSERKER",
  displayOrder: 1,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponEnchant
