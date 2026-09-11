import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const audible = {
  id: "01a06808-148e-7004-b044-a3189ecda5a3",
  type: "book-collection",
  slug: "audible",
  title: "Audible",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies BookCollection
