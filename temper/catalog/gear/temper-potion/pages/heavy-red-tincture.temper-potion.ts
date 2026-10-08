import type { TemperPotion } from "akasha/temper/catalog/gear/temper-potion/temper-potion.page-type.types.ts"

export const heavyRedTincture = {
  id: "01a0e108-307d-7b43-8099-17404f90bd3a",
  type: "page-type/temper-potion",
  slug: "heavy-red-tincture",
  title: "Heavy Red Tincture",
  key: "heavy-red-tincture",
  itemId: 68356,
  restores: ["temper-metric/health-restore"],
  createdAt: "2026-09-27T04:03:25.437Z",
  updatedAt: "2026-09-27T04:03:29.000Z",
} as const satisfies TemperPotion
