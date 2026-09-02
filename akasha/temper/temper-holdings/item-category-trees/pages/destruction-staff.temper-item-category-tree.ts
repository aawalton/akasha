import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const destructionStaff = {
  id: "01a05fcf-f7d9-77af-93ad-b970c36d1820",
  pageTypeSlug: "temper-item-category-tree",
  slug: "destruction-staff",
  title: "Destruction Staff",
  parent: "weapons",
  displayOrder: 3,
  weaponTypes: [12, 13, 15],
} as const satisfies TemperItemCategoryTree
