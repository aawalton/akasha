import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const wilderqueensArch = {
  id: "019e66e7-6ab1-76ce-863f-964ef7a17e53",
  type: "page-type/temper-set",
  slug: "wilderqueens-arch",
  title: "Wilderqueen's Arch",
  key: "wilderqueens-arch",
  esoSetId: 106,
  esoItemIds: [97408, 97409, 97417, 97423, 97424, 97425, 97426, 97427, 97428, 97429],
  esoArmorTypes: ["ARMORTYPE_MEDIUM"],
  esoEquipTypes: [
    "EQUIP_TYPE_CHEST",
    "EQUIP_TYPE_FEET",
    "EQUIP_TYPE_HAND",
    "EQUIP_TYPE_HEAD",
    "EQUIP_TYPE_LEGS",
    "EQUIP_TYPE_NECK",
    "EQUIP_TYPE_RING",
    "EQUIP_TYPE_SHOULDERS",
    "EQUIP_TYPE_TWO_HAND",
    "EQUIP_TYPE_WAIST",
  ],
  esoWeaponTypes: ["WEAPONTYPE_BOW"],
  category: "temper-set-category/overland",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
