import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const savouries = {
  id: "01a0626e-c111-799f-b133-c1f15b68c6ce",
  type: "page-type/temper-recipe-list",
  slug: "savouries",
  title: "Savouries",
  displayOrder: 4,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.689Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
