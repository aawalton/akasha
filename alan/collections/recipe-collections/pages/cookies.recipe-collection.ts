import type { RecipeCollection } from "akasha/alan/collections/recipe-collections/recipe-collection.page-type.types.ts"

export const cookies = {
  id: "01a06808-ddb3-7001-b771-c0db3c7e6020",
  type: "recipe-collection",
  slug: "cookies",
  title: "Cookies",
  partOfCollections: ["dessert"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies RecipeCollection
