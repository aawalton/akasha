import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"

export const mainHand = {
  id: "01a0e109-48a0-7a3b-8093-6caac85f7f80",
  type: "page-type/temper-equip-type",
  slug: "main-hand",
  title: "Main Hand",
  equipType: 14,
} as const satisfies TemperEquipType
