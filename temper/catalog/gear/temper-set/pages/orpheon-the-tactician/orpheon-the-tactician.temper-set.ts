import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const orpheonTheTactician = {
  id: "019e66e7-6a15-76e0-9012-f200ae54bf77",
  type: "page-type/temper-set",
  slug: "orpheon-the-tactician",
  title: "Orpheon the Tactician",
  key: "orpheon-the-tactician",
  esoSetId: 801,
  esoItemIds: [213680, 213686, 213692, 213698, 213704, 213710],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/no-type",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
