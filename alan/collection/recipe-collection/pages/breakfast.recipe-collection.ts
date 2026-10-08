import type { RecipeCollection } from "akasha/alan/collection/recipe-collection/recipe-collection.page-type.types.ts"

export const breakfast = {
  id: "01a06808-ddb3-7000-8cea-e1e015b167bc",
  type: "page-type/recipe-collection",
  slug: "breakfast",
  title: "Breakfast",
  partOfCollections: ["recipe-collection/recipes"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:10:06.643Z",
  updatedAt: "2026-09-15T16:24:34.000Z",
} as const satisfies RecipeCollection
