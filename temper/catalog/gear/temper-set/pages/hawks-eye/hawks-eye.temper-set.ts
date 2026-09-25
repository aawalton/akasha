import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const hawksEye = {
  id: "019e66ec-775e-78af-9f85-3fffbdb0411d",
  type: "page-type/temper-set",
  slug: "hawks-eye",
  title: "Hawk's Eye",
  key: "hawks-eye",
  esoSetId: 100,
  esoItemIds: [93175, 93176, 93184, 93190, 93191, 93192, 93193, 93194, 93195, 93196],
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
  category: "temper-set-category/pvp",
  valid: ["*:medium"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
