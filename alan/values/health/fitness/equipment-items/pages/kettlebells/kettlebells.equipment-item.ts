import type { EquipmentItem } from "../../equipment-item.page-type.ts"

export const kettlebells = {
  id: "019f01e1-b168-7b90-ad55-91681ce407a8",
  pageTypeSlug: "equipment-item",
  slug: "kettlebells",
  title: "Kettlebells",
  category: "kettlebells",
  configuration: "single",
  available: true,
  loads: [5, 10, 15],
  notes: "Single bells.",
  sortOrder: 2,
} as const satisfies EquipmentItem
