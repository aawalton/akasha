import type { RecipeCollection } from "akasha/alan/collection/recipe-collection/recipe-collection.page-type.types.ts"

export const recipes = {
  id: "01a06808-ddb3-7005-ac78-a301272de1c6",
  type: "page-type/recipe-collection",
  slug: "recipes",
  title: "Recipes",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies RecipeCollection
