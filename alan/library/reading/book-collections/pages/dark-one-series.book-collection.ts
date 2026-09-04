import type { BookCollection } from "../book-collection.page-type.ts"

export const darkOneSeries = {
  id: "01a06808-148e-7016-b24f-d48e193bd689",
  pageTypeSlug: "book-collection",
  slug: "dark-one-series",
  title: "Dark One Series",
  partOfSlugs: ["brandon-sanderson-s-non-cosmere-books"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
