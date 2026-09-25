import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const zoalTheEverWakeful = {
  id: "019e6484-6025-7ab5-b405-f87c856dac02",
  type: "page-type/temper-set",
  slug: "zoal-the-ever-wakeful",
  title: "Zoal the Ever-Wakeful",
  key: "zoal-the-ever-wakeful",
  esoSetId: 598,
  esoItemIds: [175196, 175202, 175208, 175214, 175220, 175226],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
