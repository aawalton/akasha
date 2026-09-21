import type { TemperEsoPlayerEquipmentConstant } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/temper-eso-player-equipment-constant.page-type.types.ts"

export const weaponTypeMace = {
  id: "01a05fd7-41c4-7feb-8e5c-3775465cb60f",
  type: "page-type/temper-eso-player-equipment-constant",
  slug: "weapon-type-mace",
  title: "Weapon Type Mace",
  key: "weapon-type:mace",
  constantFamily: "weapon-type",
  constantId: "mace",
  esoNum: 2,
  displayOrder: 2,
} as const satisfies TemperEsoPlayerEquipmentConstant
