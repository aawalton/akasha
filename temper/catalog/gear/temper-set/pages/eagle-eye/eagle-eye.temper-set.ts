import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const eagleEye = {
  id: "019e66ec-76f5-7e48-93f0-c502da95dd60",
  type: "page-type/temper-set",
  slug: "eagle-eye",
  title: "Eagle Eye",
  key: "eagle-eye",
  esoSetId: 130,
  esoItemIds: [92135, 92136, 92137, 183204, 183205, 183206, 183207],
  esoEquipTypes: ["EQUIP_TYPE_NECK", "EQUIP_TYPE_RING", "EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: [
    "WEAPONTYPE_BOW",
    "WEAPONTYPE_FIRE_STAFF",
    "WEAPONTYPE_FROST_STAFF",
    "WEAPONTYPE_HEALING_STAFF",
    "WEAPONTYPE_LIGHTNING_STAFF",
  ],
  category: "temper-set-category/pvp",
  valid: ["jewelry:*", "bow", "inferno-staff", "ice-staff", "lightning-staff", "restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
