import type { TemperRecipeList } from "../../temper-recipe-list.page-type.ts"

export const services = {
  id: "01a0626e-c112-74fe-8e51-661e87c64399",
  pageTypeSlug: "temper-recipe-list",
  slug: "services",
  title: "Services",
  displayOrder: 30,
  recipes: "jsonl",
} as const satisfies TemperRecipeList
