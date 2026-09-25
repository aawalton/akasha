import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const sellistrix = {
  id: "019e6484-6014-79e0-91fd-043beb02a7e2",
  type: "page-type/temper-set",
  slug: "sellistrix",
  title: "Sellistrix",
  key: "sellistrix",
  esoSetId: 271,
  esoItemIds: [94508, 94644, 94780, 94916, 95052, 95188],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
