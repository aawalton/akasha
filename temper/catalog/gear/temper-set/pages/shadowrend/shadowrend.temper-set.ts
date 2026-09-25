import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const shadowrend = {
  id: "019e6484-6016-78cf-b4ea-3026cd5c80d7",
  type: "page-type/temper-set",
  slug: "shadowrend",
  title: "Shadowrend",
  key: "shadowrend",
  esoSetId: 265,
  esoItemIds: [94460, 94596, 94732, 94868, 95004, 95140],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
