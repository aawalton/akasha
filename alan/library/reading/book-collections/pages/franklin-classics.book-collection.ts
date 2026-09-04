import type { BookCollection } from "../book-collection.page-type.ts"

export const franklinClassics = {
  id: "01a06808-148e-7022-b3f2-06a7279d074f",
  pageTypeSlug: "book-collection",
  slug: "franklin-classics",
  title: "Franklin Classics",
  partOfSlugs: ["classics-collections"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
