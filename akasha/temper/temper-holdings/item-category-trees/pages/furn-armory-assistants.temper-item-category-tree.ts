import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnArmoryAssistants = {
  id: "01a05fcf-f7e5-744a-90d6-5b7934d21dfc",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-armory-assistants",
  title: "Armory Assistants",
  parent: "furn-services",
  displayOrder: 0,
  furnitureSubcategoryIds: [199],
} as const satisfies TemperItemCategoryTree
