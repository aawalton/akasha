import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const cordialTeas = {
  id: "01a0626e-c111-7264-be07-c1044ab1f4b4",
  pageTypeSlug: "temper-recipe-list",
  slug: "cordial-teas",
  title: "Cordial Teas",
  displayOrder: 13,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
