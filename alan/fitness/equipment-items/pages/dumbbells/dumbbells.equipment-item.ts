import type { EquipmentItem } from "../../equipment-item.page-type.ts"

export const dumbbells = {
  id: "019f01e1-b0dc-72f8-9040-f0924d81a528",
  pageTypeSlug: "equipment-item",
  slug: "dumbbells",
  title: "Dumbbells",
  category: "dumbbells",
  configuration: "pair",
  available: true,
  loads: [3, 5, 8, 10, 15, 20, 25, 30],
  notes: "Standard + light DB pairs, one continuous ladder.",
  sortOrder: 1,
} as const satisfies EquipmentItem
