import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"

export const head = {
  id: "01a0e109-48a0-7f10-8f51-e5c67237095a",
  type: "page-type/temper-equip-type",
  slug: "head",
  title: "Head",
  equipType: 1,
} as const satisfies TemperEquipType
