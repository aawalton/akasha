import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sentinelOfRkugamz = {
  id: "019e6484-6015-79bb-b853-1c957e149bda",
  type: "page-type/temper-set",
  slug: "sentinel-of-rkugamz",
  title: "Sentinel of Rkugamz",
  key: "sentinel-of-rkugamz",
  esoSetId: 268,
  esoItemIds: [94484, 94620, 94756, 94892, 95028, 95164],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
