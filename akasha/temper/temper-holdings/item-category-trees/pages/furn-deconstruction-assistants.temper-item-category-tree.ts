import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDeconstructionAssistants = {
  id: "01a05fcf-f7f0-7af3-baaa-57d9e4d418bf",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-deconstruction-assistants",
  title: "Deconstruction Assistants",
  parent: "furn-services",
  displayOrder: 3,
  furnitureSubcategoryIds: [200],
} as const satisfies TemperItemCategoryTree
