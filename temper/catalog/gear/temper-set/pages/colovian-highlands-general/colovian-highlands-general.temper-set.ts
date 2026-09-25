import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const colovianHighlandsGeneral = {
  id: "019e66ec-769f-7bce-a8b6-09534d0e3ac2",
  type: "page-type/temper-set",
  slug: "colovian-highlands-general",
  title: "Colovian Highlands General",
  key: "colovian-highlands-general",
  esoSetId: 711,
  esoItemIds: [198677, 198683, 198689, 198695, 198701, 198707],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/pvp",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
