import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"

export const twoHand = {
  id: "01a0e109-48a0-7d9e-9212-83c75e090fcf",
  type: "page-type/temper-equip-type",
  slug: "two-hand",
  title: "Two Hand",
  equipType: 6,
} as const satisfies TemperEquipType
