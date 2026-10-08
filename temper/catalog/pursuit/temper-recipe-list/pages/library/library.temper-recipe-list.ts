import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const library = {
  id: "01a0626e-c112-78e7-989e-1314cc051824",
  type: "page-type/temper-recipe-list",
  slug: "library",
  title: "Library",
  displayOrder: 22,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.690Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
