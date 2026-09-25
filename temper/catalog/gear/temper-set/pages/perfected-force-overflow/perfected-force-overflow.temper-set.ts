import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedForceOverflow = {
  id: "019e6484-5fbd-738d-b172-5650ea4cd594",
  type: "page-type/temper-set",
  slug: "perfected-force-overflow",
  title: "Perfected Force Overflow",
  key: "perfected-force-overflow",
  esoSetId: 568,
  esoItemIds: [170010],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_HEALING_STAFF"],
  category: "temper-set-category/arena",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
