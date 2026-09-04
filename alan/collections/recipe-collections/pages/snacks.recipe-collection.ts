import type { RecipeCollection } from "../recipe-collection.page-type.ts"

export const snacks = {
  id: "01a06808-ddb3-7006-860c-3eefbc47c93c",
  pageTypeSlug: "recipe-collection",
  slug: "snacks",
  title: "Snacks",
  partOfSlugs: ["recipes"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies RecipeCollection
