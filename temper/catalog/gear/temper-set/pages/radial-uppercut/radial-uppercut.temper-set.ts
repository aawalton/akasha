import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const radialUppercut = {
  id: "019e6484-5fd1-7a98-b11b-fabe3f1cba02",
  type: "page-type/temper-set",
  slug: "radial-uppercut",
  title: "Radial Uppercut",
  key: "radial-uppercut",
  esoSetId: 412,
  esoItemIds: [145019, 145020, 145021],
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
