import type { RecipeCollection } from "../recipe-collection.page-type.ts"

export const dessert = {
  id: "01a06808-ddb3-7002-b29a-9faa833af26e",
  pageTypeSlug: "recipe-collection",
  slug: "dessert",
  title: "Dessert",
  partOfSlugs: ["recipes"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies RecipeCollection
