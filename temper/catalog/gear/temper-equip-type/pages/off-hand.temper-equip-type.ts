import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"

export const offHand = {
  id: "01a0e109-48a0-761d-8228-b5ef877236f6",
  type: "page-type/temper-equip-type",
  slug: "off-hand",
  title: "Off Hand",
  equipType: 7,
} as const satisfies TemperEquipType
