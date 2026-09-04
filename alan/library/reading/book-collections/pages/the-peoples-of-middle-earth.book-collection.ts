import type { BookCollection } from "../book-collection.page-type.ts"

export const thePeoplesOfMiddleEarth = {
  id: "01a06808-148f-702c-8d1d-1c29fbe9c757",
  pageTypeSlug: "book-collection",
  slug: "the-peoples-of-middle-earth",
  title: "The Peoples of Middle-earth",
  partOfSlugs: ["the-history-of-middle-earth"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1996-01-01",
} as const satisfies BookCollection
