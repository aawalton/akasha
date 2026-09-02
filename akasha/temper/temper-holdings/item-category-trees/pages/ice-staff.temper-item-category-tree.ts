import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const iceStaff = {
  id: "01a05fcf-f822-7a20-b0b5-3e339b816ec1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "ice-staff",
  title: "Ice Staff",
  parent: "destruction-staff",
  displayOrder: 1,
  weaponTypes: [13],
} as const satisfies TemperItemCategoryTree
