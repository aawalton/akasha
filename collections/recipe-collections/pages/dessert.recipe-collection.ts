import type { RecipeCollection } from "../recipe-collection.page-type.types.ts"

export const dessert = {
  id: "01a06808-ddb3-7002-b29a-9faa833af26e",
  pageTypeSlug: "recipe-collection",
  type: "recipe-collection",
  slug: "dessert",
  title: "Dessert",
  partOfCollections: ["recipes"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies RecipeCollection
