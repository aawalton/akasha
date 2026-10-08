import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const gourmet = {
  id: "01a0626e-c111-7b36-b9a0-5a84d6e98e48",
  type: "page-type/temper-recipe-list",
  slug: "gourmet",
  title: "Gourmet",
  displayOrder: 7,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.689Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
