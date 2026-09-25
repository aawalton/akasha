import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const tremorscale = {
  id: "019e6484-6020-7ef0-b469-a92f1af03ca6",
  type: "page-type/temper-set",
  slug: "tremorscale",
  title: "Tremorscale",
  key: "tremorscale",
  esoSetId: 276,
  esoItemIds: [94548, 94684, 94820, 94956, 95092, 95228],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
