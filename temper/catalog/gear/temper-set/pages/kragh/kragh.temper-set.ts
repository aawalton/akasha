import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kragh = {
  id: "019e6484-6000-7d6f-97fa-f0972a15b69a",
  type: "page-type/temper-set",
  slug: "kragh",
  title: "Kra'gh",
  key: "kragh",
  esoSetId: 266,
  esoItemIds: [94468, 94604, 94740, 94876, 95012, 95148],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
