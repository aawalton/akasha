import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const grandRejuvenation = {
  id: "019e6484-5fb2-7b67-b3dc-9175b48a5c4f",
  type: "page-type/temper-set",
  slug: "grand-rejuvenation",
  title: "Grand Rejuvenation",
  key: "grand-rejuvenation",
  esoSetId: 318,
  esoItemIds: [55939],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: ["WEAPONTYPE_HEALING_STAFF"],
  category: "temper-set-category/arena",
  valid: ["restoration-staff"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
