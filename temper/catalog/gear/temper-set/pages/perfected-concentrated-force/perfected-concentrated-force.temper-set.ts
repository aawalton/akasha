import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedConcentratedForce = {
  id: "019e66ec-7c55-707b-9b3f-f8b89f5e5604",
  type: "page-type/temper-set",
  slug: "perfected-concentrated-force",
  title: "Perfected Concentrated Force",
  key: "perfected-concentrated-force",
  esoSetId: 361,
  esoItemIds: [133255, 133256, 133257],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_FIRE_STAFF", "WEAPONTYPE_FROST_STAFF", "WEAPONTYPE_LIGHTNING_STAFF"],
  category: "temper-set-category/trial",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
