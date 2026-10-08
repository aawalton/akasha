import type { TemperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.types.ts"

export const precise = {
  id: "019e5b8b-e54b-75fa-afc2-cfdd5f966f52",
  type: "page-type/temper-weapon-trait",
  slug: "precise",
  title: "Precise",
  key: "precise",
  effect: "Increases Weapon and Spell Critical",
  material: "Ruby",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_PRECISE",
  displayOrder: 7,
  effects: "jsonl",
  hashPlace: 7,
  available: true,
  createdAt: "2026-05-24T19:52:35.403Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperWeaponTrait
