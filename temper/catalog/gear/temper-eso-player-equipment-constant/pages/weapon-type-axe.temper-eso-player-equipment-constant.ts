import type { TemperEsoPlayerEquipmentConstant } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/temper-eso-player-equipment-constant.page-type.types.ts"

export const weaponTypeAxe = {
  id: "01a05fd7-41c2-78ee-88b6-35ed73659e10",
  type: "page-type/temper-eso-player-equipment-constant",
  slug: "weapon-type-axe",
  title: "Weapon Type Axe",
  key: "weapon-type:axe",
  constantFamily: "weapon-type",
  constantId: "axe",
  esoNum: 1,
  displayOrder: 1,
} as const satisfies TemperEsoPlayerEquipmentConstant
