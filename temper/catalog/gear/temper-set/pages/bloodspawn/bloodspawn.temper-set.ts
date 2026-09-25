import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const bloodspawn = {
  id: "019e6484-5ff0-7c4d-865a-82a106a625f2",
  type: "page-type/temper-set",
  slug: "bloodspawn",
  title: "Bloodspawn",
  key: "bloodspawn",
  esoSetId: 163,
  esoItemIds: [59416, 59422, 59428, 59434, 59440, 59446],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
