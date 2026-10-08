import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const tinctures = {
  id: "01a0626e-c111-78cc-9b72-a345a91fd9bf",
  type: "page-type/temper-recipe-list",
  slug: "tinctures",
  title: "Tinctures",
  displayOrder: 12,
  recipes: "jsonl",
  createdAt: "2026-09-02T14:03:40.689Z",
  updatedAt: "2026-09-21T15:27:16.000Z",
} as const satisfies TemperRecipeList
