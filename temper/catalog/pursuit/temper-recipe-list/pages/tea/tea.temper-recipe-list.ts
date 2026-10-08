import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const tea = {
  id: "01a0626e-c111-77ff-b925-4c08bfe7c20b",
  type: "page-type/temper-recipe-list",
  slug: "tea",
  title: "Tea",
  displayOrder: 9,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.689Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
