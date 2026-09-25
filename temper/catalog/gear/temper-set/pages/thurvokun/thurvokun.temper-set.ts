import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const thurvokun = {
  id: "019e6484-601f-7eae-858b-051b4dcf3674",
  type: "page-type/temper-set",
  slug: "thurvokun",
  title: "Thurvokun",
  key: "thurvokun",
  esoSetId: 349,
  esoItemIds: [129482, 129490, 129498, 129506, 129514, 129522],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
