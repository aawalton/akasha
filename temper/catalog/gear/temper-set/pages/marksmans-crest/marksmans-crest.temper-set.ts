import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const marksmansCrest = {
  id: "019e66ec-780f-7936-9456-00ffc220186c",
  type: "page-type/temper-set",
  slug: "marksmans-crest",
  title: "Marksman's Crest",
  key: "marksmans-crest",
  esoSetId: 234,
  esoItemIds: [73873, 73874, 73875, 73876, 73877, 73878, 73879, 73894, 73895, 73903],
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
