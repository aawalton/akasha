import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const fruitDishes = {
  id: "01a0626e-c111-7f20-8052-b40e012fa131",
  type: "page-type/temper-recipe-list",
  slug: "fruit-dishes",
  title: "Fruit Dishes",
  displayOrder: 2,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.689Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
