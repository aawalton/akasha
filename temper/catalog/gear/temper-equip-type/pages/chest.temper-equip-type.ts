import type { TemperEquipType } from "akasha/temper/catalog/gear/temper-equip-type/temper-equip-type.page-type.types.ts"

export const chest = {
  id: "01a0e109-489f-7f17-ab12-d6c51ffbaca1",
  type: "page-type/temper-equip-type",
  slug: "chest",
  title: "Chest",
  equipType: 3,
} as const satisfies TemperEquipType
