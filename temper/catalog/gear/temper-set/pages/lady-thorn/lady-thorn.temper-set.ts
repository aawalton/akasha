import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ladyThorn = {
  id: "019e6484-6002-7c80-bb71-087c7aef4e4f",
  type: "page-type/temper-set",
  slug: "lady-thorn",
  title: "Lady Thorn",
  key: "lady-thorn",
  esoSetId: 535,
  esoItemIds: [167111, 167117, 167123, 167129, 167135, 167141],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
