import type { RecipeCollection } from "akasha/alan/collection/recipe-collection/recipe-collection.page-type.types.ts"

export const snacks = {
  id: "01a06808-ddb3-7006-860c-3eefbc47c93c",
  type: "page-type/recipe-collection",
  slug: "snacks",
  title: "Snacks",
  partOfCollections: ["recipe-collection/recipes"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies RecipeCollection
