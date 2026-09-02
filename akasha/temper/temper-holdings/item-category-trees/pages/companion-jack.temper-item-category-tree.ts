import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionJack = {
  id: "01a05fcf-f7cb-7577-a845-2891699b7f93",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-jack",
  title: "Jack",
  parent: "companion-medium",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
