import type { RecipeCollection } from "../recipe-collection.page-type.ts"

export const breakfast = {
  id: "01a06808-ddb3-7000-8cea-e1e015b167bc",
  pageTypeSlug: "recipe-collection",
  slug: "breakfast",
  title: "Breakfast",
  partOfSlugs: ["recipes"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies RecipeCollection
