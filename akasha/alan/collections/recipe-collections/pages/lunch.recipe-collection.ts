import type { RecipeCollection } from "../recipe-collection.page-type.ts"

export const lunch = {
  id: "01a06808-ddb3-7004-acc1-f6f65d4302ba",
  pageTypeSlug: "recipe-collection",
  slug: "lunch",
  title: "Lunch",
  partOfSlugs: ["recipes"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies RecipeCollection
