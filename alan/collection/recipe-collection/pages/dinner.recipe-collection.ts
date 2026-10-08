import type { RecipeCollection } from "akasha/alan/collection/recipe-collection/recipe-collection.page-type.types.ts"

export const dinner = {
  id: "01a06808-ddb3-7003-8378-f01cf7c7e65e",
  type: "page-type/recipe-collection",
  slug: "dinner",
  title: "Dinner",
  partOfCollections: ["recipe-collection/recipes"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:10:06.643Z",
  updatedAt: "2026-09-15T16:24:34.000Z",
} as const satisfies RecipeCollection
