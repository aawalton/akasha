import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const shield = {
  id: "01a05fcf-f83b-7096-bf42-2c6f6bbb40d8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "shield",
  title: "Shield",
  parent: "armor",
  displayOrder: 0,
  weaponTypes: [14],
} as const satisfies TemperItemCategoryTree
