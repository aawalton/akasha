import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCraftingStations = {
  id: "01a05fcf-f7ee-7d0e-9b4b-c934d6aa527b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-crafting-stations",
  title: "Crafting Stations",
  parent: "furn-services",
  displayOrder: 2,
  furnitureSubcategoryIds: [103],
} as const satisfies TemperItemCategoryTree
