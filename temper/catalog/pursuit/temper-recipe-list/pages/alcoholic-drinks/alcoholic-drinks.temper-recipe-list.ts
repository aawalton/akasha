import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const alcoholicDrinks = {
  id: "01a0626e-c111-7a97-961c-e0d23b79696b",
  type: "page-type/temper-recipe-list",
  slug: "alcoholic-drinks",
  title: "Alcoholic Drinks",
  displayOrder: 8,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.689Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
