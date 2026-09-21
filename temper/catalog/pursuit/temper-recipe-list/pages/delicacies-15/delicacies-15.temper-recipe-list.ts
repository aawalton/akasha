import type { TemperRecipeList } from "akasha/temper/catalog/pursuit/temper-recipe-list/temper-recipe-list.page-type.types.ts"

export const delicacies15 = {
  id: "01a0626e-c111-7bd8-a6bf-9b1ad319e9de",
  type: "page-type/temper-recipe-list",
  slug: "delicacies-15",
  title: "Delicacies",
  displayOrder: 15,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
