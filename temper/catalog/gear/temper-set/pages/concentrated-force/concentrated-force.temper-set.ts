import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const concentratedForce = {
  id: "019e66ec-7a9e-7489-bbe0-1ffc779498e8",
  type: "page-type/temper-set",
  slug: "concentrated-force",
  title: "Concentrated Force",
  key: "concentrated-force",
  esoSetId: 367,
  esoItemIds: [133408, 133409, 133410],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_FIRE_STAFF", "WEAPONTYPE_FROST_STAFF", "WEAPONTYPE_LIGHTNING_STAFF"],
  category: "temper-set-category/trial",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
