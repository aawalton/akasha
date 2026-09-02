import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkIngredients = {
  id: "01a05fcf-f7db-7348-a117-a7268dbd0d5f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-ingredients",
  title: "Drink Ingredients",
  parent: "ingredients",
  displayOrder: 1,
  specializedItemTypes: [44, 45, 46],
} as const satisfies TemperItemCategoryTree
