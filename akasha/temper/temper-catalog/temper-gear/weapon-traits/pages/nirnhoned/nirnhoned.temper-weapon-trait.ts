import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const nirnhoned = {
  id: "01a05fd8-a460-76b1-b2ae-689299392e1b",
  pageTypeSlug: "temper-weapon-trait",
  slug: "nirnhoned",
  title: "Nirnhoned",
  key: "nirnhoned",
  effect: "Increases Weapon and Spell Damage",
  material: "Fortified Nirncrux",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_NIRNHONED",
  displayOrder: 5,
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
