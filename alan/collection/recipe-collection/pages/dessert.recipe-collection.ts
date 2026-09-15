import type { RecipeCollection } from "akasha/alan/collection/recipe-collection/recipe-collection.page-type.types.ts"

export const dessert = {
  id: "01a06808-ddb3-7002-b29a-9faa833af26e",
  type: "page-type/recipe-collection",
  slug: "dessert",
  title: "Dessert",
  partOfCollections: ["recipe-collection/recipes"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies RecipeCollection
