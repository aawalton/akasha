import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const distillates = {
  id: "01a0626e-c111-7e0e-8464-70eef467e8d0",
  type: "page-type/temper-recipe-list",
  slug: "distillates",
  title: "Distillates",
  displayOrder: 14,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
