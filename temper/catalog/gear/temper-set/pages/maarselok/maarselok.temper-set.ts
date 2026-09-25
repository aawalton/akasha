import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const maarselok = {
  id: "019e6484-6004-7cc8-86a2-48695c6517fa",
  type: "page-type/temper-set",
  slug: "maarselok",
  title: "Maarselok",
  key: "maarselok",
  esoSetId: 459,
  esoItemIds: [152308, 152309, 152310, 152311, 152312, 152313],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
