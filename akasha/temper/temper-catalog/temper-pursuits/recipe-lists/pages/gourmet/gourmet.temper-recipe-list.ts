import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const gourmet = {
  id: "01a0626e-c111-7b36-b9a0-5a84d6e98e48",
  pageTypeSlug: "temper-recipe-list",
  slug: "gourmet",
  title: "Gourmet",
  displayOrder: 7,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
