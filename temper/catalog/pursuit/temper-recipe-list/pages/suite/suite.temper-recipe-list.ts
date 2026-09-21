import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const suite = {
  id: "01a0626e-c112-732b-b346-68de19ff1c33",
  type: "page-type/temper-recipe-list",
  slug: "suite",
  title: "Suite",
  displayOrder: 26,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
