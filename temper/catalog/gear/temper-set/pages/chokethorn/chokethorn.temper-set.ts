import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const chokethorn = {
  id: "019e6484-5ff1-7c8b-8507-714924b32dda",
  type: "page-type/temper-set",
  slug: "chokethorn",
  title: "Chokethorn",
  key: "chokethorn",
  esoSetId: 269,
  esoItemIds: [94492, 94628, 94764, 94900, 95036, 95172],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
