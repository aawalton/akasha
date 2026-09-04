import type { BookCollection } from "../book-collection.page-type.ts"

export const theFallOfGondolin = {
  id: "01a06808-148f-7022-8aed-b2d5df73b818",
  pageTypeSlug: "book-collection",
  slug: "the-fall-of-gondolin",
  title: "The Fall of Gondolin",
  partOfSlugs: ["the-lord-of-the-rings-books"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "2018-08-30",
} as const satisfies BookCollection
