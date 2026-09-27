import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"

export const poison = {
  id: "01a0e109-48a0-7e45-8109-83d86edbbb78",
  type: "page-type/temper-equip-type",
  slug: "poison",
  title: "Poison",
  equipType: 15,
} as const satisfies TemperEquipType
