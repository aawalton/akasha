import type { BookCollection } from "../book-collection.page-type.ts"

export const theSilmarillion = {
  id: "01a06808-148f-7031-9c8e-d2682eebe32b",
  pageTypeSlug: "book-collection",
  slug: "the-silmarillion",
  title: "The Silmarillion",
  partOfSlugs: ["the-lord-of-the-rings-books"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1977-09-15",
} as const satisfies BookCollection
