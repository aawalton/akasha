import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const kjalnarsNightmare = {
  id: "019e6484-5fff-7d84-af3b-37ddd98a114d",
  type: "page-type/temper-set",
  slug: "kjalnars-nightmare",
  title: "Kjalnar's Nightmare",
  key: "kjalnars-nightmare",
  esoSetId: 479,
  esoItemIds: [158222, 158228, 158234, 158240, 158246, 158252],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
