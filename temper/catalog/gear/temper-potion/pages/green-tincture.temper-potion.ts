import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const greenTincture = {
  id: "01a0e108-307d-72f3-85fc-6b5e747385aa",
  type: "page-type/temper-potion",
  slug: "green-tincture",
  title: "Green Tincture",
  key: "green-tincture",
  itemId: 68353,
  restores: ["temper-metric/stamina-restore"],
} as const satisfies TemperPotion
