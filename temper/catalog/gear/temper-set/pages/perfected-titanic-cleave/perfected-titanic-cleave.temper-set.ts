import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedTitanicCleave = {
  id: "019e6484-5fc8-7e8c-8883-1072d1e9b733",
  type: "page-type/temper-set",
  slug: "perfected-titanic-cleave",
  title: "Perfected Titanic Cleave",
  key: "perfected-titanic-cleave",
  esoSetId: 528,
  esoItemIds: [166057, 166058, 166059],
  esoEquipTypes: ["EQUIP_TYPE_TWO_HAND"],
  esoWeaponTypes: [
    "WEAPONTYPE_TWO_HANDED_AXE",
    "WEAPONTYPE_TWO_HANDED_HAMMER",
    "WEAPONTYPE_TWO_HANDED_SWORD",
  ],
  category: "temper-set-category/arena",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
