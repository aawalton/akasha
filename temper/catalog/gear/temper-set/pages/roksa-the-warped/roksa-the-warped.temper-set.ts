import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const roksaTheWarped = {
  id: "019e6484-6011-7dba-bc5a-b8fd5b596ca9",
  type: "page-type/temper-set",
  slug: "roksa-the-warped",
  title: "Roksa the Warped",
  key: "roksa-the-warped",
  esoSetId: 683,
  esoItemIds: [193119, 193125, 193131, 193137, 193143, 193149],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
