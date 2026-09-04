import type { BookCollection } from "../book-collection.page-type.ts"

export const theBookOfLostTalesPartTwo = {
  id: "01a06808-148f-7018-b956-1e1870c925bd",
  pageTypeSlug: "book-collection",
  slug: "the-book-of-lost-tales-part-two",
  title: "The Book of Lost Tales, Part Two",
  partOfSlugs: ["the-history-of-middle-earth"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1984-01-01",
} as const satisfies BookCollection
