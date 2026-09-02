import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeBallista = {
  id: "01a05fcf-f83c-71be-9bad-351665fad7a1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-ballista",
  title: "Ballista",
  parent: "siege-equipment",
  displayOrder: 4,
  specializedItemTypes: [401],
} as const satisfies TemperItemCategoryTree
