import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const gallery = {
  id: "01a0626e-c112-7ec3-b3a7-14decfcf82eb",
  pageTypeSlug: "temper-recipe-list",
  slug: "gallery",
  title: "Gallery",
  displayOrder: 20,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
