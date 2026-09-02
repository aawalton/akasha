import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const tinctures = {
  id: "01a0626e-c111-78cc-9b72-a345a91fd9bf",
  pageTypeSlug: "temper-recipe-list",
  slug: "tinctures",
  title: "Tinctures",
  displayOrder: 12,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
