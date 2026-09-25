import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const barSakka = {
  id: "019e66e7-69fb-7061-8c1d-cfc0e6d93b3a",
  type: "page-type/temper-set",
  slug: "bar-sakka",
  title: "Bar-Sakka",
  key: "bar-sakka",
  esoSetId: 829,
  esoItemIds: [219087, 219093, 219099, 219105, 219111, 219117],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/no-type",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
