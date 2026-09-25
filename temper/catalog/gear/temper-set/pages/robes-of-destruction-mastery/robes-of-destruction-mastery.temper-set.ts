import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const robesOfDestructionMastery = {
  id: "019e6484-5fd3-7704-bf1b-875b00055bd7",
  type: "page-type/temper-set",
  slug: "robes-of-destruction-mastery",
  title: "Robes of Destruction Mastery",
  key: "robes-of-destruction-mastery",
  esoSetId: 88,
  esoItemIds: [44055, 44056, 44057, 44058, 44059, 44060, 87307, 87308, 87317, 87318, 87319, 87323],
  esoArmorTypes: ["ARMORTYPE_LIGHT"],
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
  esoWeaponTypes: ["WEAPONTYPE_FIRE_STAFF", "WEAPONTYPE_FROST_STAFF", "WEAPONTYPE_LIGHTNING_STAFF"],
  category: "temper-set-category/arena",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
