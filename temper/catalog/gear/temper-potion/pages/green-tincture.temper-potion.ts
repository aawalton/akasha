import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const greenTincture = {
  id: "01a0e108-307d-72f3-85fc-6b5e747385aa",
  type: "page-type/temper-potion",
  slug: "green-tincture",
  title: "Green Tincture",
  key: "green-tincture",
  itemId: 68353,
  restores: ["temper-metric/stamina-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
