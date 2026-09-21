import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const structures = {
  id: "01a0626e-c112-7a41-bcd8-96988de2df9d",
  type: "page-type/temper-recipe-list",
  slug: "structures",
  title: "Structures",
  displayOrder: 25,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
