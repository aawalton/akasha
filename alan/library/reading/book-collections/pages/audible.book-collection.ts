import type { BookCollection } from "../book-collection.page-type.ts"

export const audible = {
  id: "01a06808-148e-7004-b044-a3189ecda5a3",
  pageTypeSlug: "book-collection",
  slug: "audible",
  title: "Audible",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies BookCollection
