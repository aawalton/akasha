import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedGrandRejuvenation = {
  id: "019e6484-5fbf-7c7d-b856-557791b5018a",
  type: "page-type/temper-set",
  slug: "perfected-grand-rejuvenation",
  title: "Perfected Grand Rejuvenation",
  key: "perfected-grand-rejuvenation",
  esoSetId: 533,
  esoItemIds: [166064],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_HEALING_STAFF"],
  category: "temper-set-category/arena",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
