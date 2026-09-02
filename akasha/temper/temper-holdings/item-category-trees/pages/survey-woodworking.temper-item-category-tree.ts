import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const surveyWoodworking = {
  id: "01a05fcf-f843-7978-a39b-79310c33764b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "survey-woodworking",
  title: "Woodworking",
  parent: "survey-reports",
  displayOrder: 2,
  itemNameContains: "Woodworker",
} as const satisfies TemperItemCategoryTree
