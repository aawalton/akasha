import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const motherCiannait = {
  id: "019e6484-6009-7c9a-9003-5c0c9b71c946",
  type: "page-type/temper-set",
  slug: "mother-ciannait",
  title: "Mother Ciannait",
  key: "mother-ciannait",
  esoSetId: 478,
  esoItemIds: [158160, 158166, 158172, 158178, 158184, 158190],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
