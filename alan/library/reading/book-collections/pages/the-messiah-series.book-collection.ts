import type { BookCollection } from "../book-collection.page-type.ts"

export const theMessiahSeries = {
  id: "01a06808-148f-702b-8318-e07f0375d06f",
  pageTypeSlug: "book-collection",
  slug: "the-messiah-series",
  title: "The Messiah Series",
  partOfSlugs: ["bruce-r-mcconkie"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
