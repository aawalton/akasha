import type { BookCollection } from "../book-collection.page-type.ts"

export const theLaysOfBeleriand = {
  id: "01a06808-148f-7027-b348-2b7e9f9f48ac",
  pageTypeSlug: "book-collection",
  slug: "the-lays-of-beleriand",
  title: "The Lays of Beleriand",
  partOfSlugs: ["the-history-of-middle-earth"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1985-01-01",
} as const satisfies BookCollection
