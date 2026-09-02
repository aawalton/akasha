import type { EquipmentQualityId } from "@akasha/temper-equipment-kinds/equipment-qualities"

export const ESO_EQUIP_TYPES = {
  EQUIP_TYPE_HEAD: 1,
  EQUIP_TYPE_NECK: 2,
  EQUIP_TYPE_CHEST: 3,
  EQUIP_TYPE_SHOULDERS: 4,
  EQUIP_TYPE_ONE_HAND: 5,
  EQUIP_TYPE_TWO_HAND: 6,
  EQUIP_TYPE_OFF_HAND: 7,
  EQUIP_TYPE_WAIST: 8,
  EQUIP_TYPE_LEGS: 9,
  EQUIP_TYPE_FEET: 10,
  EQUIP_TYPE_RING: 12,
  EQUIP_TYPE_HAND: 13,
  EQUIP_TYPE_MAIN_HAND: 14,
} as const

export const ESO_QUALITY_TO_COMPANION_QUALITY: Record<number, EquipmentQualityId> = {
  1: "normal",
  2: "fine",
  3: "superior",
  4: "epic",
  5: "legendary",
}

export const COMPANION_QUALITY_TO_ESO: Record<string, number> = {
  "no-quality": 5,
  "normal": 1,
  "fine": 2,
  "superior": 3,
  "epic": 4,
  "legendary": 5,
}
