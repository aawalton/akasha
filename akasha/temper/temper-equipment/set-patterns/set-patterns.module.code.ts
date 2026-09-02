import type { StandardArmorType } from "@akasha/temper-equipment-kinds/armor-types"
import type { JewelryTypeId } from "@akasha/temper-equipment-kinds/jewelry-types"
import type { StandardArmorWeightId } from "../armor-weight-ids/armor-weight-ids.module.code.ts"
import type { WeaponTypeId } from "../weapon-type-ids/weapon-type-ids.module.code.ts"

export type EquipmentPattern =
  | WeaponTypeId
  | JewelryTypeId
  | "shield"
  | `${StandardArmorType}:${StandardArmorWeightId}`
  | `${StandardArmorType}:*`
  | "armor:*"
  | `armor:${StandardArmorWeightId}`
  | "monster"
  | "weapon:*"
  | "jewelry:*"
  | "*"
  | `*:${StandardArmorWeightId}`
