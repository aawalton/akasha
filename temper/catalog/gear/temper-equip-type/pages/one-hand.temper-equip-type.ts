import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"

export const oneHand = {
  id: "01a0e109-48a0-7975-b091-5a4ca9086c5e",
  type: "page-type/temper-equip-type",
  slug: "one-hand",
  title: "One-Handed",
  equipType: 5,
} as const satisfies TemperEquipType
