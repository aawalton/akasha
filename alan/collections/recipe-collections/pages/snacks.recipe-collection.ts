import type { RecipeCollection } from "../recipe-collection.page-type.types.ts"

export const snacks = {
  id: "01a06808-ddb3-7006-860c-3eefbc47c93c",
  pageTypeSlug: "recipe-collection",
  type: "recipe-collection",
  slug: "snacks",
  title: "Snacks",
  partOfCollections: ["recipes"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies RecipeCollection
