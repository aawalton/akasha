import type { RecipeCollection } from "../recipe-collection.page-type.ts"

export const cookies = {
  id: "01a06808-ddb3-7001-b771-c0db3c7e6020",
  pageTypeSlug: "recipe-collection",
  slug: "cookies",
  title: "Cookies",
  partOfSlugs: ["dessert"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies RecipeCollection
