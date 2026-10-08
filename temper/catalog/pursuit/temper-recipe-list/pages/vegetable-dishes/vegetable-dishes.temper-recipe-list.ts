import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const vegetableDishes = {
  id: "01a0626e-c111-74a4-8c68-3d49c9569ce6",
  type: "page-type/temper-recipe-list",
  slug: "vegetable-dishes",
  title: "Vegetable Dishes",
  displayOrder: 3,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.689Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
