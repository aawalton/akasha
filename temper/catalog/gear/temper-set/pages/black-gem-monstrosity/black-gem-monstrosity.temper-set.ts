import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const blackGemMonstrosity = {
  id: "019e66e7-69fe-703b-873d-5e18b02508e2",
  type: "page-type/temper-set",
  slug: "black-gem-monstrosity",
  title: "Black Gem Monstrosity",
  key: "black-gem-monstrosity",
  esoSetId: 828,
  esoItemIds: [219031, 219037, 219043, 219049, 219055, 219061],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/no-type",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
