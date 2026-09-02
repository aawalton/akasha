import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTimeOfDay = {
  id: "01a05fcf-f814-7e3d-8968-3fc230d4fe2b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-time-of-day",
  title: "Time of Day Control",
  parent: "furn-services",
  displayOrder: 12,
  furnitureSubcategoryIds: [202],
} as const satisfies TemperItemCategoryTree
