import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionBow = {
  id: "01a05fcf-f7c5-7c56-bf15-b138e7133174",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-bow",
  title: "Bow",
  parent: "companion-weapons",
  displayOrder: 2,
  weaponTypes: [8],
} as const satisfies TemperItemCategoryTree
