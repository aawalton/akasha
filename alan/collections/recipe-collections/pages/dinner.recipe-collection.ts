import type { RecipeCollection } from "../recipe-collection.page-type.ts"

export const dinner = {
  id: "01a06808-ddb3-7003-8378-f01cf7c7e65e",
  pageTypeSlug: "recipe-collection",
  slug: "dinner",
  title: "Dinner",
  partOfCollections: ["recipes"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies RecipeCollection
