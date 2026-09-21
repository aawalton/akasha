import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const library = {
  id: "01a0626e-c112-78e7-989e-1314cc051824",
  type: "page-type/temper-recipe-list",
  slug: "library",
  title: "Library",
  displayOrder: 22,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
