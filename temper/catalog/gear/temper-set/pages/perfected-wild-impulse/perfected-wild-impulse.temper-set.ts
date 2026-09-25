import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedWildImpulse = {
  id: "019e6484-5fcb-78cb-a56a-f87cf46d72c2",
  type: "page-type/temper-set",
  slug: "perfected-wild-impulse",
  title: "Perfected Wild Impulse",
  key: "perfected-wild-impulse",
  esoSetId: 427,
  esoItemIds: [145176, 145177, 145178],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_FIRE_STAFF", "WEAPONTYPE_FROST_STAFF", "WEAPONTYPE_LIGHTNING_STAFF"],
  category: "temper-set-category/arena",
  valid: ["inferno-staff", "ice-staff", "lightning-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
