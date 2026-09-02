import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const equipmentRepairKits = {
  id: "01a05fcf-f7df-7b68-8a7b-19a48ecd8ac8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "equipment-repair-kits",
  title: "Equipment Repair Kits",
  parent: "repair-kits",
  displayOrder: 0,
  filterTypes: [3],
  itemTypes: [9],
} as const satisfies TemperItemCategoryTree
