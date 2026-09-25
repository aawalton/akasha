import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const iceheart = {
  id: "019e6484-5ffb-7041-8601-b4cfcaf14038",
  type: "page-type/temper-set",
  slug: "iceheart",
  title: "Iceheart",
  key: "iceheart",
  esoSetId: 274,
  esoItemIds: [94532, 94668, 94804, 94940, 95076, 95212],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
