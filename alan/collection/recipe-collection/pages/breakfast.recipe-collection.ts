import type { RecipeCollection } from "akasha/alan/collection/recipe-collection/recipe-collection.page-type.types.ts"

export const breakfast = {
  id: "01a06808-ddb3-7000-8cea-e1e015b167bc",
  type: "recipe-collection",
  slug: "breakfast",
  title: "Breakfast",
  partOfCollections: ["recipe-collection/recipes"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies RecipeCollection
