import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const encratissBehemoth = {
  id: "019e6484-5ff4-7d41-904b-e34338afa40f",
  type: "page-type/temper-set",
  slug: "encratiss-behemoth",
  title: "Encratis's Behemoth",
  key: "encratiss-behemoth",
  esoSetId: 577,
  esoItemIds: [171602, 171608, 171614, 171620, 171626, 171632],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
