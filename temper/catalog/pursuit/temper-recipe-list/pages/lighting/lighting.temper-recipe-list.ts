import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const lighting = {
  id: "01a0626e-c112-73fb-8409-b1f13481f6b6",
  type: "page-type/temper-recipe-list",
  slug: "lighting",
  title: "Lighting",
  displayOrder: 24,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
