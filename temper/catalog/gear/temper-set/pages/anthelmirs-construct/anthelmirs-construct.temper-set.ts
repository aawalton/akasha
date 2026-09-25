import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const anthelmirsConstruct = {
  id: "019e6484-5feb-7c88-940a-e74e9af364d7",
  type: "page-type/temper-set",
  slug: "anthelmirs-construct",
  title: "Anthelmir's Construct",
  key: "anthelmirs-construct",
  esoSetId: 734,
  esoItemIds: [202475, 202481, 202487, 202493, 202499, 202505],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
