import type { BookCollection } from "../book-collection.page-type.ts"

export const theShapingOfMiddleEarth = {
  id: "01a06808-148f-7030-80ab-dad071276e0b",
  pageTypeSlug: "book-collection",
  slug: "the-shaping-of-middle-earth",
  title: "The Shaping of Middle-earth",
  partOfSlugs: ["the-history-of-middle-earth"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1986-01-01",
} as const satisfies BookCollection
