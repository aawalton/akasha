import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const meatDishes = {
  id: "01a0626e-c111-7ccd-8fea-05e83c8c381b",
  type: "page-type/temper-recipe-list",
  slug: "meat-dishes",
  title: "Meat Dishes",
  displayOrder: 1,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.689Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
