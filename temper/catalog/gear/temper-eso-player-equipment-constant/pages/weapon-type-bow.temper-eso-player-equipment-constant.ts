import type { TemperEsoPlayerEquipmentConstant } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/temper-eso-player-equipment-constant.page-type.types.ts"

export const weaponTypeBow = {
  id: "01a05fd7-41c2-72ca-b59e-fe1323730143",
  type: "page-type/temper-eso-player-equipment-constant",
  slug: "weapon-type-bow",
  title: "Weapon Type Bow",
  key: "weapon-type:bow",
  constantFamily: "weapon-type",
  constantId: "bow",
  esoNum: 8,
  displayOrder: 7,
} as const satisfies TemperEsoPlayerEquipmentConstant
