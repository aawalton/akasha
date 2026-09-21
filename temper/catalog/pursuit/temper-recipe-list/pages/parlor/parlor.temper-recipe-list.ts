import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const parlor = {
  id: "01a0626e-c112-7d07-b656-ab080d2ee6dd",
  type: "page-type/temper-recipe-list",
  slug: "parlor",
  title: "Parlor",
  displayOrder: 23,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
