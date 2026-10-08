import type { RecipeCollection } from "akasha/alan/collection/recipe-collection/recipe-collection.page-type.types.ts"

export const cookies = {
  id: "01a06808-ddb3-7001-b771-c0db3c7e6020",
  type: "page-type/recipe-collection",
  slug: "cookies",
  title: "Cookies",
  partOfCollections: ["recipe-collection/dessert"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:10:06.643Z",
  updatedAt: "2026-09-15T16:24:34.000Z",
} as const satisfies RecipeCollection
