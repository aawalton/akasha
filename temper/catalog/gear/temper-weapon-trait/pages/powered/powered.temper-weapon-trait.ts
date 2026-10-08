import type { TemperWeaponTrait } from "akasha/temper/catalog/gear/temper-weapon-trait/temper-weapon-trait.page-type.types.ts"

export const powered = {
  id: "019e5b8b-e549-7d10-841e-e3e8cfe05a8d",
  type: "page-type/temper-weapon-trait",
  slug: "powered",
  title: "Powered",
  key: "powered",
  effect: "Increases Healing Done",
  material: "Chysolite",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_POWERED",
  displayOrder: 6,
  effects: "jsonl",
  hashPlace: 6,
  available: true,
  createdAt: "2026-05-24T19:52:35.401Z",
  updatedAt: "2026-09-27T03:41:25.000Z",
} as const satisfies TemperWeaponTrait
