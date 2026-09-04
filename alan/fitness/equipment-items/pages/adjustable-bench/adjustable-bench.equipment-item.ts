import type { EquipmentItem } from "../../equipment-item.page-type.ts"

export const adjustableBench = {
  id: "019f01e1-b22e-7858-a88e-87c274072184",
  pageTypeSlug: "equipment-item",
  slug: "adjustable-bench",
  title: "Adjustable Bench",
  category: "bench",
  configuration: "adjustable",
  available: true,
  notes: "Flat + incline.",
  sortOrder: 3,
} as const satisfies EquipmentItem
