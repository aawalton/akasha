import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const thousandEyes = {
  id: "01a0d94b-2de9-7dce-ad59-5aaa20723e45",
  type: "page-type/temper-set",
  slug: "thousand-eyes",
  title: "Thousand Eyes",
  key: "thousand-eyes",
  esoSetId: 850,
  hashPlace: 709,
  esoItemIds: [224167, 224173, 224179, 224185, 224191, 224197],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
