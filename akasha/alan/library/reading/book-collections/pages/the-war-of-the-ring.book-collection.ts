import type { BookCollection } from "../book-collection.page-type.ts"

export const theWarOfTheRing = {
  id: "01a06808-148f-7036-b290-7ee322fd548e",
  pageTypeSlug: "book-collection",
  slug: "the-war-of-the-ring",
  title: "The War of the Ring",
  partOfSlugs: ["the-history-of-middle-earth"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1990-01-01",
} as const satisfies BookCollection
