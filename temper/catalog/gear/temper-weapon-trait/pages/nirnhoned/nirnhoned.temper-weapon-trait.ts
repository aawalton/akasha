import type { TemperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.types.ts"

export const nirnhoned = {
  id: "019e5b8b-e547-7d4a-8306-4568b26afcec",
  type: "page-type/temper-weapon-trait",
  slug: "nirnhoned",
  title: "Nirnhoned",
  key: "nirnhoned",
  effect: "Increases Weapon and Spell Damage",
  material: "Fortified Nirncrux",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_NIRNHONED",
  displayOrder: 5,
  hashPlace: 5,
  available: true,
  createdAt: "2026-05-24T19:52:35.399Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperWeaponTrait
