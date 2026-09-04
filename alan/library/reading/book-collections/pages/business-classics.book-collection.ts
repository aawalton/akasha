import type { BookCollection } from "../book-collection.page-type.ts"

export const businessClassics = {
  id: "01a06808-148e-700f-9c77-c9de5d6cdff1",
  pageTypeSlug: "book-collection",
  slug: "business-classics",
  title: "Business Classics",
  partOfSlugs: ["classics-collections"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "completed",
} as const satisfies BookCollection
