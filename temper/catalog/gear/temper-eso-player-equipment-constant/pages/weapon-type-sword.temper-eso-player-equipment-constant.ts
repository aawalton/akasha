import type { TemperEsoPlayerEquipmentConstant } from "akasha/temper/catalog/gear/temper-eso-player-equipment-constant/temper-eso-player-equipment-constant.page-type.types.ts"

export const weaponTypeSword = {
  id: "01a05fd7-41c5-7e8d-a722-76ce65425216",
  type: "page-type/temper-eso-player-equipment-constant",
  slug: "weapon-type-sword",
  title: "Weapon Type Sword",
  key: "weapon-type:sword",
  constantFamily: "weapon-type",
  constantId: "sword",
  esoNum: 3,
  displayOrder: 3,
} as const satisfies TemperEsoPlayerEquipmentConstant
